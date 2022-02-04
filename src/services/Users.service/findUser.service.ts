import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";

class FindUserService {
  async execute(uuid: string, ownerEmail: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const owner = await usersRepository.findOne({
      where: {
        email: ownerEmail,
      },
    });
    if (owner?.uuid != uuid) {
      if (owner?.isAdm) {
        const user = await usersRepository.findOne({
          where: {
            uuid,
          },
        });
        if (!user?.email) {
          throw new Error("User not found!");
        }
        const { password, ...output } = user;

        return output;
      } else {
        throw new Error("Missing admin permissions");
      }
    }

    const user = await usersRepository.findOne({
      where: {
        uuid,
      },
    });
    if (!user?.email) {
      throw new Error("User not found!");
    }
    const { password, ...output } = user;

    return output;
  }
}
export default FindUserService;
