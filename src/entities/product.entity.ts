import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from ".";

@Entity("products")
export class Product {
  @PrimaryColumn()
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  createdAt!: string;

  @Column()
  updatedAt!: string;

  @ManyToOne(() => User, (user) => user.cart)
  userId!: string;

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date().toJSON();
    this.updatedAt = new Date().toJSON();
  }
}
