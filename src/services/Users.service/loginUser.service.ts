import { UsersRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";

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
      throw new Error("Email/Password incorrect");
    }
    const match = bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Email/Password incorrect");
    }

    return user;
  }
}

export default LoginUserService;
