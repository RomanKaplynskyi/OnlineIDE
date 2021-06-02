// import { createConnection } from 'typeorm';
import { postgresTables } from './postrgestables'
import {Pool} from 'pg';

const postgresDB = new Pool({
    user: 'tfdmoasefinufw',
    password: 'acee7f31573a3388697d14f1d2978a76b0727d2d188c4789d18d61ba0b64ff04',
    host: 'ec2-3-213-106-122.compute-1.amazonaws.com',
    database: 'dfh2iorcv57cog',
    port: 5432,
    ssl: { rejectUnauthorized: false },
});

postgresDB.connect(function (err) {
    if (err) throw err;
    else console.log('db!!!')
});

export default postgresDB;

// return await createConnection({
//     type     : 'postgres',
//     host     : 'ec2-3-213-106-122.compute-1.amazonaws.com',
//     port     :  5432,
//     username : 'tfdmoasefinufw',
//     password : 'acee7f31573a3388697d14f1d2978a76b0727d2d188c4789d18d61ba0b64ff04',
//     database : 'dfh2iorcv57cog',
//     ssl: { rejectUnauthorized: false },
//     entities: postgresTables,
//     logging: ['query', 'error'],
//     synchronize: true,
// }).then((connection) => {
//     console.log('Database connection established');
//
// });
