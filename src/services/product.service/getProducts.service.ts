import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/product.repository";

class GetProductsService {
  async execute() {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find();

    return { data: products };
  }
}

export default GetProductsService;
