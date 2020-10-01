import { Injectable } from '@nestjs/common';
import {db} from '../conf/';

import * as jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

@Injectable()
export class AuthService {

     select() {        
        return db.select('*').from('producto');
      }

      async search(id) {
        //return db('cliente').where('id_cliente', id).first();
        return await db.select('*').from('cliente').where('id_cliente', id).first();
      }

      insert(data) {
        return db('cliente').insert(data, '*');
      }

      update(id, data) {
        return db('cliente').where('id_cliente', id).update(data, '*');
      }

      delete(id) {
        return db('cliente').where('id_cliente', id).del();
      }


}
