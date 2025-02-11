import {getclient} from "./config";

async function createtable() {

   const client = await getclient();

   const createusertable = `
   CREATE TABLE IF NOT EXISTS paytmuser (
     id SERIAL PRIMARY KEY,
     firstname VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     mobile VARCHAR(12) NOT NULL,
     password VARCHAR(255) NOT NULL
   );`; 
try {
    await client.query(createusertable);
    console.log("Table succesfully created");
 }catch(error) {
  console.error("Error in creating the table",error);
 }
}
createtable();
