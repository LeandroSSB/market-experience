import { Product } from "../../entities/product.entity";
import { ProductsRepository } from "../../repositories/product.repositoru";

class GetProductsService {
  async execute(): Promise<Product[]> {
    const productsRepository = new ProductsRepository();

    const products = await productsRepository.find();

    return products;
  }
}

export default GetProductsService;
