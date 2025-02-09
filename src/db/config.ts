import {Client} from "pg";

export async function getclient() { 
  const client = new Client({connectionString:`postgresql://postgres:harsh@localhost:5431/postgres`});
	  try{
	   await client.connect();
	   console.log("Connection success");
	   return client;
	   }catch(error) {
		   console.log("Error occured in db connection",error);
	   }
}
