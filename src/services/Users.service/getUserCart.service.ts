import { getCustomRepository } from "typeorm";
import { Product, User } from "../../entities";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";

interface cartList {
  owner: string;
  cart: Product[];
}

class GetUserCartService {
  async execute(isAdm: boolean) {
    const usersRepository = getCustomRepository(UsersRepository);
    if (!isAdm) {
      throw new ErrorHandler(401, "Missing admin permissions");
    }

    const users = await usersRepository.find();

    const carts: cartList[] = [];
    users.forEach((user) => {
      return carts.push({
        owner: user.email,
        cart: user.cart,
      });
    });
    return { data: carts };
  }
}

export default GetUserCartService;
