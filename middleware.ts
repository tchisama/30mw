import { NextRequest } from "next/server";

export  function middleware(req:NextRequest) {
  if(req.nextUrl.pathname === "/") {
    console.log("track!")
  }
}



export const matcher = {
  matcher: "/",
}