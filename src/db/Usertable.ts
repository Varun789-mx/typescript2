import {getclient} from "./config";

async function createtable() {
 try{
   const client = await getclient();
   if(!client) {
     throw new Error("Failed to connect to db");
   }
   const createusertable = `CREATE TABLE user (
     id SERIAL PRIMARY KEY,
     firstname VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     mobile VARCHAR(12) NOT NULL,
     password VARCHAR(255) NOT NULL
   );`

    await client.query(createusertable);
    console.log("Table succesfully created");
    await client.end();
 }catch(error) {
  console.error("Error in creating the table");
 }
}
createtable();
