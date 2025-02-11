import {Client} from "pg"

export async function getclient() { 
	const client = new Client({ connectionString:'postgresql://postgres:harsh@localhost:5431/postgres'});
	try { 
		await client.connect();
		console.log("Connection to db is succesfull");
	}
	catch(error) { 
		console.log("Error occured in connection " + error);
	}
	return client;
}
