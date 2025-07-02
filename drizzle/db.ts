//intialize neon client using the connection string from .env file

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const  sql = neon(process.env.DATABASE_URL !);

//create and export  the drizzle orm instance  with the neon client and the schema for type-safe queries
export const db =  drizzle(sql, {schema});