import { UsersRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../utils/error";

interface IUserProps {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

class CreateUserService {
  async execute({ name, email, password, isAdm }: IUserProps) {
    const usersRepository = getCustomRepository(UsersRepository);
    const encryptedPass = bcrypt.hashSync(password, 10);
    try {
      const user = usersRepository.create({
        name: name,
        email: email,
        isAdm: isAdm,
        password: encryptedPass,
      });

      await usersRepository.save(user);
      const { password: disposable, ...outputUser } = user;
      return outputUser;
    } catch (error) {
      throw new ErrorHandler(409, "Email already exists");
    }
  }
}

export default CreateUserService;
