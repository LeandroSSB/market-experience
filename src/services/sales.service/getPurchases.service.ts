import { getCustomRepository } from "typeorm";
import { SalesRepository } from "../../repositories/sales.repository";
import { ErrorHandler } from "../../utils/error";

class GetPurchases {
  async execute(isAdm: boolean) {
    if (!isAdm) {
      throw new ErrorHandler(401, "Missing admin permissions");
    }

    const saleRepo = getCustomRepository(SalesRepository);

    const sales = await saleRepo.find();

    return { data: sales };
  }
}

export default GetPurchases;
