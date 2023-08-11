import { Injectable } from "@nestjs/common";
import { HashInterface } from "./hash-interface.adapter";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashAdapter implements HashInterface {

   async hash(password: string):Promise<string>{
    return await bcrypt.hash(password,10);
  }

  compare(password: string, hashPassword: string):Promise<boolean> {
     return bcrypt.compare(password, hashPassword);
  }
}