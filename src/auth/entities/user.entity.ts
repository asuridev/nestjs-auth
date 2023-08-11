import { IsIn } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column('varchar',{
    unique:true
  })
  email:string

  @Column()
  password:string

  @Column()
  name:string

  @Column()
  lastName:string

  @Column('varchar',{
    default:'user'
  })
  @IsIn(['user','admin','super-admin'])
  rol?:string

  @Column('bool',{
    default:true
  })
  isActive?:boolean

}
