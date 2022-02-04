import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";

class GetUserService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}
export default GetUserService;
