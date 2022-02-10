import { getCustomRepository } from "typeorm";
import { SalesRepository } from "../../repositories/sales.repository";
import { ErrorHandler } from "../../utils/error";

class FindPurchaseService {
  async execute(uuid: string, isAdm: boolean, ownerEmail: string) {
    const saleRepo = getCustomRepository(SalesRepository);

    const sale = await saleRepo.findOne({
      where: {
        uuid,
      },
    });
    if (!sale?.product) {
      throw new ErrorHandler(404, "Purchase not found");
    }

    if (!isAdm && sale.user.email !== ownerEmail) {
      throw new ErrorHandler(401, "Missing admin permissions ");
    }

    return { data: sale };
  }
}

export default FindPurchaseService;
