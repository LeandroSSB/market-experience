import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";

class GetUserCartService {
  async execute(isAdm: boolean) {
    const usersRepository = getCustomRepository(UsersRepository);
    if (!isAdm) {
      throw new ErrorHandler(401, "Missing admin permissions");
    }

    const carts = await usersRepository.find({ select: ["uuid", "cart"] });

    console.log(carts);
    return { data: carts };
  }
}

export default GetUserCartService;
