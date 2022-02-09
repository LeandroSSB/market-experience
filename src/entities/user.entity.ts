import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Product } from "./product.entity";

@Entity("users")
export class User {
  @PrimaryColumn()
  uuid!: string;

  @Column()
  name!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column()
  isAdm!: boolean;

  @Column()
  createdOn: string;

  @Column()
  updatedOn: string;

  @ManyToMany((type) => Product, (product) => product.uuid, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  cart!: Product[];

  constructor() {
    this.createdOn = new Date().toJSON();
    this.updatedOn = new Date().toJSON();
    this.uuid = uuidv4();
  }
}
