//import { Config } from 'knex';
import * as Knex from 'knex';

// Update with your config settings.

const conf = {
	db: {
	  client: 'pg',
	  connection: process.env.DATABASE_URL || 'postgres://postgres:zayro8905@localhost:5432/imaginamos',
	},
	port: process.env.PORT || 3000,	
	dblocal:  'postgres://postgres:zayro8905@localhost:5432/imaginamos',
	dbremoto:  'postgres://wmffzqhqrxkdpj:d57ffa3a7d9cac8988441c71610e8bc49a9f75d6628b27ee43e7114a914b3e00@ec2-34-197-141-7.compute-1.amazonaws.com:5432/ddbmpbq8o1jpgg'	,
	dbMysql: {
		client: 'mysql',
		connection: {
		  host : '127.0.0.1',
		  user : 'root',
		  password : 'zayro8905',
		  database : 'demo'
		}
	  }
};


export const db = Knex(conf.dbMysql);

