import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Product, User } from ".";

@Entity("sales")
export class Sale {
  @PrimaryColumn()
  uuid: string;

  @Column()
  purchasedAt: string;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne((type) => Product, (product) => product.sales)
  product!: Product;

  @ManyToOne((type) => User, (user) => user.purchases)
  user!: User;

  constructor() {
    this.uuid = uuidv4();
    this.purchasedAt = new Date().toJSON();
  }
}
