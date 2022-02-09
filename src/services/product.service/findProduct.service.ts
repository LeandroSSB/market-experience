import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/product.repository";
import { ErrorHandler } from "../../utils/error";

class FindProductService {
  async execute(uuid: string) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne({
      where: {
        uuid,
      },
    });
    if (!product?.name) {
      throw new ErrorHandler(404, "Product not found");
    }

    return product;
  }
}

export default FindProductService;
