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

  @ManyToOne(() => User, (user) => user.cart)
  userId!: string;

  constructor() {
    this.uuid = uuidv4();
  }
}
