import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/product.repository";
import { ErrorHandler } from "../../utils/error";

interface IProductProps {
  name: string;
  price: number;
}

class CreateProductService {
  async execute({ name, price }: IProductProps, isAdm: boolean) {
    const productsRepository = getCustomRepository(ProductsRepository);

    if (!isAdm) {
      throw new ErrorHandler(401, "Missing adm permissions");
    }

    const product = productsRepository.create({
      name,
      price,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
