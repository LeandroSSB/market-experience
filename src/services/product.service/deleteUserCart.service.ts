import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";

class DeleteUserCartService {
  async execute(productUuid: string, ownerEmail: string, userUuid?: string) {
    const UserRepo = getCustomRepository(UsersRepository);
    const owner = await UserRepo.findOne({
      where: {
        email: ownerEmail,
      },
    });
    if (!owner?.email) {
      throw new ErrorHandler(404, "User not found");
    }
    if (userUuid) {
      if (owner.uuid != userUuid && !owner.isAdm) {
        throw new ErrorHandler(401, "Missing Admin Permissions");
      }
      const search = await UserRepo.findOne({
        where: {
          uuid: userUuid,
        },
      });
      if (!search?.email) {
        throw new ErrorHandler(404, "User not found");
      }
      if (!search.cart.find((prod) => prod.uuid == productUuid)) {
        throw new ErrorHandler(404, "Product not found");
      }
      search.cart = search.cart.filter((prod) => prod.uuid !== productUuid);
      await UserRepo.save(search);
    } else {
      if (!owner.cart.find((prod) => prod.uuid == productUuid)) {
        throw new ErrorHandler(404, "Product not found");
      }
      owner.cart = owner.cart.filter((prod) => prod.uuid !== productUuid);
      await UserRepo.save(owner);
    }

    return "Product removed from the cart ";
  }
}

export default DeleteUserCartService;
