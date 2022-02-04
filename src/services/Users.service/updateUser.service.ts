import { User } from "../../entities";
import { UsersRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";

interface IUpdateProps {
  ownerEmail: string;
  uuid: string;
  data: {
    name?: string;
    email?: string;
    password?: string;
    isAdm?: boolean;
  };
}

class UpdateUserService {
  async execute({ ownerEmail, uuid, data }: IUpdateProps) {
    const usersRepository = getCustomRepository(UsersRepository);
    const owner = await usersRepository.findOne({
      where: {
        email: ownerEmail,
      },
    });

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    if (owner?.uuid != uuid) {
      if (owner?.isAdm) {
        await usersRepository.update(
          { uuid: uuid },
          {
            updatedOn: new Date().toJSON(),
            ...data,
          }
        );
      } else {
        throw new Error("Missing admin permissions");
      }
    }

    await usersRepository.update(
      { uuid: uuid },
      {
        updatedOn: new Date().toJSON(),
        ...data,
      }
    );
    const user = await usersRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!user?.email) {
      throw new Error("User not found!");
    }

    const { password, ...output } = user as User;

    return output;
  }
}
export default UpdateUserService;
