// "use client"
import { cookies } from "next/headers";
import Image from "next/image";
export default function Home() {
  return (
    <Component />
  );
}
const Component = () => {
  const serverAction = async ()=>{
    "use server"
    console.log("hi")
  }
  const run =()=>{
    console.log("hi")
  }
  return (
    <div>
    <form action={serverAction}>
      <input type="submit" />
    </form>
      {/* <button onClick={run}>hi</button> */}
    </div>
      
  );
}