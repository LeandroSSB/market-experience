import { UsersRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";

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

    const user = usersRepository.create({
      name: name,
      email: email,
      isAdm: isAdm,
      password: encryptedPass,
    });
    console.log(user);

    await usersRepository.save(user);
    const { password: disposable, ...outputUser } = user;
    return outputUser;
  }
}

export default CreateUserService;
