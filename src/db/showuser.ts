import {getclient} from "./config";

export async function showusers() { 
	const client = await getclient();
	const showquery = `SELECT * FROM paytmuser`;
	try { 
	const showres = await client.query(showquery);
		console.log("Show user working");
		for(let user of showres.rows) { 
			console.log(`Email : ${user.email} Name: ${user.firstname} Mobile: ${user.mobile} `);
		}

	}
	catch(error) { 
		console.error("Error in showing all the users");
	} 
}
showusers();

