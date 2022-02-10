import { Express, Router } from "express";
import AddProductCartController from "../controllers/product.controller/addProductCart.controller";
import CreateProductController from "../controllers/product.controller/createProduct.controller";
import DeleteUserCartController from "../controllers/product.controller/deleteUserCart.controller";
import FindProductController from "../controllers/product.controller/findProduct.controller";
import FindPurchaseController from "../controllers/product.controller/findPurchase.controller";
import FindUserCartController from "../controllers/product.controller/findUserCart.controller";
import GetProductsController from "../controllers/product.controller/getProducts.controller";
import GetPurchasesController from "../controllers/product.controller/getPurchases.controller";
import PurchaseController from "../controllers/product.controller/purchase.controller";
import GetUserCartController from "../controllers/users.controller/getUserCart.controller";

const getProductsController = new GetProductsController();
const createProductController = new CreateProductController();
const findProductController = new FindProductController();
const addProductCartController = new AddProductCartController();
const findUserCartController = new FindUserCartController();
const getUserCartController = new GetUserCartController();
const deleteUserCartController = new DeleteUserCartController();
const purchaseController = new PurchaseController();
const getPurchasesController = new GetPurchasesController();
const findPurchaseController = new FindPurchaseController();

export const productRouter = (app: Express) => {
  const routerProduct = Router();
  routerProduct.get("", getProductsController.handle);
  routerProduct.post("", createProductController.handle);
  routerProduct.get("/:uuid", findProductController.handle);

  app.use("/product", routerProduct);
};
export const productCartRouter = (app: Express) => {
  const routerCart = Router();
  routerCart.post("", addProductCartController.handle);
  routerCart.get("/:uuid", findUserCartController.handle);
  routerCart.get("", getUserCartController.handle);
  routerCart.delete("/:uuid", deleteUserCartController.handle);
  app.use("/cart", routerCart);
};

export const emailRouter = (app: Express) => {
  const router = Router();
  router.post("/buy", purchaseController.handle);
  router.get("/buy", getPurchasesController.handle);
  router.get("/buy/:uuid", findProductController.handle);

  app.use(router);
};
