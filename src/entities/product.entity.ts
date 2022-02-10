import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import Sale from "./sale.entity";

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

  @Column({ nullable: true })
  imageUrl!: string;

  @OneToMany((type) => Sale, (sale) => sale.product, { cascade: true })
  sales!: Sale[];

  @Column({ default: 0 })
  available!: number;

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date().toJSON();
    this.updatedAt = new Date().toJSON();
  }
}
