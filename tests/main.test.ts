import request from 'supertest';
import {server} from '../server/main'
import postgresDB from "../server/databases/postgres-db";
import {getConnection} from "typeorm";

describe('Testing users', () => {

    const testUser = {
        email: 'testUser@gmail.com',
        password:'testUser',
        password2: 'testUser'
    }

    beforeAll(async () => {
        await postgresDB;
    });

    afterAll(async () => {
        // const queryRunner = getConnection().createQueryRunner();
        // await queryRunner.query('TRUNCATE users');
        // await queryRunner.release();
        //await postgresDB.query('TRUNCATE users');
    })


    describe('POST /users', () => {
        it('User registered, status 201 ', async done => {
            const response = await request(server)
                .post('/register')
                .send(testUser)
                .set('Accept', 'application/json')
            expect(response.status).toBe(201);
            done();
        })
        it('wrong input data, status 400 ', async done => {
            const response = await request(server)
                .post('/register')
                .send()
                .set('Accept', 'application/json')
            expect(response.status).toBe(400);
            done();
        })
        it('Email is already exist, status 400 ', async done => {
            const response = await request(server)
                .post('/register')
                .send({email:testUser.email, password:'password', password2:'password'})
                .set('Accept', 'application/json')
            expect(response.status).toBe(400);
            done();
        })
        it('Email is required, status 400 ',  done => {
            request(server)
                .post('/login')
                .send()
                .set('Accept', 'application/json')
                .expect(400, done)
        })
        it('Email is not found, status 400', done => {
            request(server)
                .post('/login')
                .send({email: 'testUser@gmail.com', password:'testuser'})
                .set('Accept', 'application/json')
                .expect(400, done)
        })
        it('Invalid password, status 400 ', done => {
            request(server)
                .post('/login')
                .send({email:'testUser@gmail.com', password: 'fakepassword'})
                .set('Accept', 'application/json')
                .expect(400, done)
        })
        it('user logIn, status 200 ', done => {
            request(server)
                .post('/login')
                .send({email:testUser.email, password:testUser.password})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
        it('No user with this email, status 404 ', async done => {
            const response = await request(server)
                .post('/reset')
                .send({email: ''})
                .set('Accept', 'application/json')
            expect(response.status).toBe(404);
            done();
        })
        it.skip('Reset Password, status 200', async done => {
            const response = await request(server)
                .post('/reset')
                .send({email: testUser.email})
                .set('Accept', 'application/json')
            expect(response.status).toBe(200);
            done();
        })
    })

})
