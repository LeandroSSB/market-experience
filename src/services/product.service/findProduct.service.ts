import { ProductsRepository } from "../../repositories/product.repositoru";
import { ErrorHandler } from "../../utils/error";

class FindProductService {
  async execute(uuid: string) {
    const productsRepository = new ProductsRepository();

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
