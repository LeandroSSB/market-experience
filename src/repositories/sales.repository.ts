import { EntityRepository, Repository } from "typeorm";
import { Sale } from "../entities/sale.entity";

@EntityRepository(Sale)
class SalesRepository extends Repository<Sale> {}

export { SalesRepository };
