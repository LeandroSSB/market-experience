import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../../repositories/product.repository";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";

class AddProductCartService {
  async execute(uuid: string, ownerEmail: string) {
    const productsRepository = getCustomRepository(ProductsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const product = await productsRepository.findOne({
      where: {
        uuid,
      },
    });
    if (!product?.name) {
      throw new ErrorHandler(404, "Product not found");
    }

    const user = await usersRepository.findOne({
      where: {
        email: ownerEmail,
      },
    });

    if (!user?.name) {
      throw new ErrorHandler(404, "User not found");
    }

    if (!user.cart) {
      user.cart = [];
    }

    if (user.cart.find((prod) => prod.uuid == product.uuid)) {
      throw new ErrorHandler(409, "Item already in the cart ");
    }

    user.updatedOn = new Date().toJSON();
    user.cart.push(product);

    await usersRepository.save(user);

    return { data: user.cart };
  }
}

export default AddProductCartService;
