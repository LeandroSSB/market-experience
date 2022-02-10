import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/product.repository";
import { SalesRepository } from "../../repositories/sales.repository";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";

class PurchaseService {
  async execute(productId: string, ownerEmail: string, quantity?: number) {
    const userRepo = getCustomRepository(UsersRepository);
    const productRepo = getCustomRepository(ProductsRepository);
    const salesRepo = getCustomRepository(SalesRepository);

    const user = await userRepo.findOne({
      where: {
        email: ownerEmail,
      },
    });

    if (!user?.email) {
      throw new ErrorHandler(404, "User not found");
    }

    const product = await productRepo.findOne({
      where: {
        uuid: productId,
      },
    });

    if (!product?.name) {
      throw new ErrorHandler(404, "Product not found");
    }

    if (!user.cart.find((prod) => prod.uuid == productId)) {
      throw new ErrorHandler(404, "Product not in the cart ");
    }

    const sale = salesRepo.create({
      product: product,
      quantity: quantity || 1,
      user: user,
    });

    await salesRepo.save(sale);
    return sale;
  }
}

export default PurchaseService;
