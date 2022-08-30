import { Client,Account,Databases } from "appwrite";
const client =new Client();
client.setEndpoint("http://localhost/v1").setProject("62fce1e688941bc09792")
//accoutn for users

export const account = new Account(client)

//Databases

export const database = new Databases(client,"62fce222c377277d7e25")

//bucket