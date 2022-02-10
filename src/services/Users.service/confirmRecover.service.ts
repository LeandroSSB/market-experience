import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../utils/error";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

class ConfirmRecoverService {
  async execute(email: string, recover: string, password: string) {
    const userRepo = getCustomRepository(UsersRepository);
    const user = await userRepo.findOne({
      where: {
        email,
      },
    });
    if (!user?.email) {
      throw new ErrorHandler(404, "User not found");
    }

    if (user.recover !== recover) {
      user.recover = uuidv4();
      await userRepo.save(user);
      throw new ErrorHandler(
        401,
        "Invalid recover, please make another recover code "
      );
    }
    const newPass = bcrypt.hashSync(password, 10);
    user.password = newPass;
    user.recover = uuidv4();

    userRepo.save(user);

    return user;
  }
}

export default ConfirmRecoverService;
