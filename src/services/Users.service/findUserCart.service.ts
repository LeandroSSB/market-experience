import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";

class FindUserCartService {
  async execute(uuid: string, ownerEmail: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const owner = await usersRepository.findOne({
      where: {
        email: ownerEmail,
      },
    });
    if (!owner?.email) {
      throw new ErrorHandler(404, "User not found");
    }

    if (owner.uuid != uuid && !owner.isAdm) {
      throw new ErrorHandler(401, "Missing admin permissions ");
    }

    const user = await usersRepository.findOne({ where: { uuid } });

    if (!user?.email) {
      throw new ErrorHandler(404, "User not found");
    }

    if (!user?.cart) {
      user.cart = [];
    }

    return { data: user.cart };
  }
}

export default FindUserCartService;
