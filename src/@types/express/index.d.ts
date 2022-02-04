declare global {
  namespace Express {
    interface Request {
      AuthenticatedUser?: UserModel;
      isAdm?: boolean;
    }
  }
}

declare namespace Express {
  interface Request {
    AuthenticatedUser?: UserModel;
    isAdm?: boolean;
  }
}

/* 
Deixo as duas maneiras pois aparentemente o compilador uma vez 
prefere um ao inves do outro aleatoriamente, nao consegui achar nenhuma relacao do por que disso ocorrer
*/
