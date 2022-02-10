import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";
import { v4 as uuidv4 } from "uuid";

class RecoverPassService {
  async execute(email: string) {
    const userRepo = getCustomRepository(UsersRepository);

    const user = await userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user?.email) {
      throw new ErrorHandler(404, "User not found");
    }

    user.recover = uuidv4();
    await userRepo.save(user);

    return user.recover;
  }
}

export default RecoverPassService;
