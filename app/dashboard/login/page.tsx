
"use client"
import React from "react";
import {Tabs, Tab, Card, CardBody, Input, Link, Button} from "@nextui-org/react";
import { LogIn } from "lucide-react";
import { Timestamp, addDoc, and, collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

export default function App() {
    const router = useRouter()
    const [selected, setSelected] = React.useState<string>("login");
    const [signin, setSignin] = React.useState({
      email: "",
      password: "",
    });
    const [signup, setSignup] = React.useState({
      email: "",
      password: "",
      name: "",
    });
    const [loading, setLoading] = React.useState(false)
    
  const signinFun = ()=>{
    setLoading(true);
    getDocs(query( collection(db,"_30mw_admins"), and( where("email", "==", signin.email) , where("password", "==", signin.password) , where("accepted" , "==", true) ))).then((res)=>{
      if(res.docs.length === 0){
        alert("Wrong Credentials")
        setLoading(false)
      }else{
        localStorage.setItem("_30mw_admin", JSON.stringify({...res.docs[0].data(), id: res.docs[0].id}))
        setLoading(false)
        
        router.push("/dashboard/")
      }
    }
    )
  }

  const signupFun = ()=>{
    setLoading(true);
    addDoc(collection(db,"_30mw_admins"),{
      fullName: signup.name,
      email: signup.email,
      password: signup.password,
      _30mw_deleted: false,
      _30mw_createdAt : Timestamp.now(),
      _30mw_updatedAt : Timestamp.now(),
    })
    .then(()=>{
      alert("Account Created")
      setLoading(false)
      // router.push("/dashboard/login")
    })

  }


  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="relative flex flex-col">
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            variant="bordered"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected as any}
          >
            <Tab  key="login" title={
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔐</span>
              <span>Login</span>
            </div>
            }>
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" value={signin.email} onChange={(e)=>setSignin({...signin, email: e.target.value})} />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={signin.password}
                  onChange={(e)=>setSignin({...signin, password: e.target.value})}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button onClick={signinFun} isLoading={loading} fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title={
            <div className="flex items-center space-x-2">
              <span className="text-lg">✨</span>
              <span>Sign up</span>
            </div>
            }>
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name"  value={signup.name} onChange={(e)=>setSignup({...signup, name: e.target.value})} />
                <Input isRequired label="Email" placeholder="Enter your email" type="email"  value={signup.email} onChange={(e)=>setSignup({...signup, email: e.target.value})} />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  value={signup.password}
                  onChange={(e)=>setSignup({...signup, password: e.target.value})}
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button onClick={signupFun} isLoading={loading} fullWidth color="primary">
                    Send Sign up request
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>

      </div>
    </div>  
  );
}
