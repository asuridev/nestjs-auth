export interface HashInterface{

  hash(password:string):Promise<string>
  
  compare(password:string, hashPassword:string):Promise<boolean>
}