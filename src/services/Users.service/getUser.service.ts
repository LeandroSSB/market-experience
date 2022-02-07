import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";

class GetUserService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return { data: users };
  }
}
export default GetUserService;
