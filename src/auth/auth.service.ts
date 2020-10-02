import { Injectable } from '@nestjs/common';
import {db} from '../conf/';

import * as jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

@Injectable()
export class AuthService {


      async login(username) {        
        console.log('username', username);
        return await db.select('*').from('users').where('username', username).first();
      }




}
