import { ProductsRepository } from "../../repositories/product.repositoru";

interface IProductProps {
  name: string;
  price: number;
}

class CreateProductService {
  async execute({ name, price }: IProductProps) {
    const productsRepository = new ProductsRepository();

    const product = productsRepository.create({
      name,
      price,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
