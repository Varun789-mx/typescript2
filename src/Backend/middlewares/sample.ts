import { getclient } from "./config.ts";
async function createTable() {
    const client = await getclient();
    const Create_User_table = `
        CREATE TABLE user (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
         mobile VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         balance NUMBER(10,3)
         )`;
    await client.query(Create_User_table);

    const Create_user_ledger = `
         CREATE TABLE ledger (

         )
         `;
}