import { UsersRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../utils/error";

interface ILoginProps {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: ILoginProps) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user?.email) {
      throw new ErrorHandler(401, "Email/Password incorrect");
    }
    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      throw new ErrorHandler(401, "Email/Password incorrect");
    }

    return user;
  }
}

export default LoginUserService;
