import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/product.entity";

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {}

export { ProductsRepository };
