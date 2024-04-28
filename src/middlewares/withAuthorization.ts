import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { getToken } from "next-auth/jwt";

export default function withAuthorization(
  middleware: NextMiddleware,
  requirePath: string[]
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requirePath.some((path) => pathname.startsWith(path))) {
      const token = await getToken({
        req: req,
        secret: process.env.SECRET,
      });
      //check not logged in
      if (!token) {
        const url = new URL(`/signIn`, req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      //check if not authorized
      if (!token.id) {
        const url = new URL(`/403`, req.url);
        return NextResponse.rewrite(url);
      }

      const ipAddress =
        req.headers.get("X-Forwarded-For") || req.ip || "unknown";
      if (!ipAddress) {
        console.log("IP address not found");
        return;
      }
      const tokenId = token.id;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId, ipAddress }),
      };

      fetch(process.env.NEXTAUTH_URL + "/api/user/logData", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }
    return middleware(req, next);
  };
}
