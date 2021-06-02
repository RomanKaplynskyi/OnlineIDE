import { loginSchema, registerSchema } from "../validation";
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken';
import { getPasswordResetURL, resetPasswordTemplate } from '../resetPsw';
import nodemailer from 'nodemailer';
import { Token } from "../entities/tokens";
import { User } from "../entities/users";
import { UserRepository } from "../repositories/UserRepository";
import { Repository } from "../repositories/Repository";

export default class UserController {
    public static async register(ctx: any) {
        const userRepository = new UserRepository();
        // Validate a data before we a user
        const { error } = registerSchema.validate(ctx.request.body);
        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.message };
        } else if (await userRepository.findByEmail(ctx.request.body.email)){
            // Checking if the user is already in the database
            ctx.status = 400;
            ctx.body = { error: 'Email is already exist' };
        } else {
            // Hash password
            const hash = await argon2.hash(ctx.request.body.password);

            // Create a new user
            const user : User = new User();
            user.email = ctx.request.body.email
            user.password = hash
            const newUser: User = await userRepository.saveEntity(user);
            ctx.status = 201;
            ctx.body = newUser;
        }
    }
    public static async login(ctx:any) {
        const userRepository = new UserRepository();
        const tokenRepository = new Repository<Token>('tokens')
        // Check if tables exists
        // Validate a data before we a user
        const { error } = loginSchema.validate(ctx.request.body);

        console.log(ctx.request.body, error)

        if (error) {
            ctx.throw(400, { error: error.message })
        }
        // Checking if the email exists
        const userByEmail: User = await userRepository.findByEmail(ctx.request.body.email);
        console.log(ctx.request.body, userByEmail)
        if (!userByEmail){
            console.log(ctx.request.body, 'errrrrr')
            ctx.throw(400, { error: 'Email is not found' })
        }
        // Password is correct
        const validPass = await argon2.verify(
            userByEmail.password,
            ctx.request.body.password,
        );
        if (!validPass){
            ctx.throw(400, { error: 'Invalid password' })
        }

        const accessToken = generateAccessToken({email: userByEmail.email,});
        const refreshToken = jwt.sign(
            userByEmail.email,
            "REFRESH_TOKEN_SECRET",
        );

      //  const rToken: Token = await token.saveToken(refreshToken);
        const token = new Token()
        token.rtoken = refreshToken
        const rToken: Token = await tokenRepository.saveEntity(token)

        ctx.status = 200;
        ctx.body = {
            userByEmail,
            rToken,
            accessToken
        }
    }

    public static async resetPsw(ctx:any) {
        const userRepository = new UserRepository();

        const { email } = ctx.request.body;
        const newUser: User = await userRepository.findByEmail(email);

        if (!newUser){
            ctx.throw(404, 'No user with that email');
        }

        const token = jwt.sign(
            { _id: newUser.id },
            "RESET_TOKEN_SECRET",
            { expiresIn: '1h' },
        );
        const url = getPasswordResetURL(newUser, token);
        const emailTemplate = resetPasswordTemplate(newUser, url);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tanyaarni@gmail.com',
                pass: 'z4127052z',
            },
        });
        const info = await transporter.sendMail(emailTemplate);
        // console.log("Message sent: %s", info.messageId);
        ctx.status = 200;
    }
}

function generateAccessToken(user:any) {
    // eslint-disable-next-line no-undef
    return jwt.sign(user, "ACCESS_TOKEN_SECRET", {
        expiresIn: '15s',
    });
}
