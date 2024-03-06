import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";
import { db } from "./firebase";

export  function middleware(req:NextRequest) {
  if(req.nextUrl.pathname === "/dashboard/login") {

  }
}



export const matcher = {
  matcher: "/dashboard/login",
}