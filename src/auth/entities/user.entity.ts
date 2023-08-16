import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'users'})
export class User {
  
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column({unique:true})
  email:string

  @Column()
  password:string

  @Column()
  name:string

  @Column({name:'last_name'})
  lastName:string

  @Column({default:'user'})
  rol?:string

  @Column()
  address:string

  @Column()
  telephone:string

  @CreateDateColumn({
    name:'created_at',
    type:'timestamptz',
    default:()=>'CURRENT_TIMESTAMP'
  })
  createdAt:Date
  
  @UpdateDateColumn({
    name:'updated_at',
    type:'timestamptz',
    default:()=>'CURRENT_TIMESTAMP'
  })
  updatedAt:Date

  @Column('bool',{
    default:true,
    name:'is_active'
  })
  isActive?:boolean

}
