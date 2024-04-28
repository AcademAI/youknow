//https://reacthustle.com/blog/how-to-get-session-in-nextjs-middleware-with-nextauthjs
//https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs

import withAuthorization from "./middlewares/withAuthorization";
import { NextMiddleware, NextResponse } from "next/server";
const mainMiddleware: NextMiddleware = (request) => {
  const res = NextResponse.next();
  //other middleware operations
  return res;
};

export default withAuthorization(mainMiddleware, ["/create"]);
