import {getclient} from "./config";
interface user_fields {
    firstname: string,
    lastname: string,
    email: string,
    mobile: string,
    password: string,
}

export async function createuser(user:user_fields) {
 try{
	 const client = await getclient();
	 if(!client) {
	    throw new Error("Failed to connect to db");
	 }
	 const insertuser = `INSERT INTO user (firstname,lastname,email,mobile,password) VALUES ($1,$2,$3,$4,$5) RETURNING id `;
	 const uservalues = [user.firstname,user.lastname,user.email,user.mobile,user.password];
	 let response = await client.query(insertuser,uservalues);
	 console.log(`User succesfully created `);
 }catch(error) {
	 console.error("Error in creating user");
 }

}
