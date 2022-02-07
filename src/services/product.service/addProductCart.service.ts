import { ProductsRepository } from "../../repositories/product.repositoru";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";

class AddProductCart {
  async execute(uuid: string, ownerEmail: string) {
    const productsRepository = new ProductsRepository();
    const usersRepository = new UsersRepository();

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

    user.cart.push(product);

    await usersRepository.save(user);

    const { password, ...output } = user;

    return output;
  }
}

export default AddProductCart;
