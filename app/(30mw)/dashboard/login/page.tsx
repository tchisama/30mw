
"use client"
import React, { useEffect } from "react";
import {Tabs, Tab, Card, CardBody, Input, Link, Button, CardHeader, CardFooter} from "@nextui-org/react";
import { LogIn } from "lucide-react";
import { Timestamp, addDoc, and, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
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
  const [newDashboard, setNewDashboard] = React.useState<boolean | null>(null)

  useEffect(()=>{
    getDocs(collection(db,"collections")).then((res)=>{
      if(res.docs.length === 0){
        setNewDashboard(true)
      }else{
        setNewDashboard(false)
      }
    })
  },[])


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




  const setup = ()=>{
       if(!signup.email || !signup.password || !signup.name){
         alert("Please fill all the fields")
         return
       }
        setDoc(doc(db,"config","brand"),{
          brandName: "test",
          logo:null,
          sologoName:"test",
        })
        addDoc(collection(db, "collections"), {
            "_30mw_createdAt": Timestamp.now(),
            "_30mw_updatedAt": Timestamp.now(),
            "collection": "_30mw_admins",
            "for_30mw": true,
            "href": "/dashboard/_30mw_admins",
            "icon": "🔐",
            "name": "_30mw_admins",
            "structure": `[{"name":"photo","type":"avatar"},{"name":"fullName","type":"string"},{"name":"rule","type":"reference","prefix":"","labels":{"true":"","false":""},"reference":{"collection":"_30mw_admins_rules","key":"name"}},{"name":"email","type":"string"},{"name":"password","type":"string"},{"name":"accepted","type":"boolean","prefix":"","labels":{"true":"accepted","false":"pending"},"reference":{}}]`,
            "subtitle": "manage admins"
        })
        addDoc(collection(db, "collections"), {
            "_30mw_createdAt": Timestamp.now(),
            "_30mw_updatedAt": Timestamp.now(),
            "collection": "_30mw_admins_rules",
            "for_30mw": true,
            "href": "/dashboard/_30mw_admins_rules",
            "icon": "🗝️",
            "motherCollection": "_30mw_admins",
            "name": "_30mw_admins_rules",
            "subtitle": "manage rules and create new ones",
            "structure": `[{"name":"name","type":"string","prefix":"","labels":{"true":"","false":""},"reference":{}},{"name":"but collections","type":"array","structure":[{"name":"collection name","type":"string","structure":[{"name":"name","type":"string"}],"prefix":"","labels":{"true":"","false":""},"reference":{}},{"name":"write / update","type":"boolean","structure":[{"name":"collection name","type":"string","structure":[{"name":"name","type":"string"}],"prefix":"","labels":{"true":"","false":""},"reference":{}},{"name":"only read","type":"boolean"}],"prefix":"","labels":{"true":"Yes","false":"No"},"reference":{}}]},{"name":"access to all ","type":"boolean"},{"name":"read all only","type":"boolean"}]`,
        }).then(()=>{
          addDoc(collection(db, "_30mw_admins_rules"), {
              "_30mw_createdAt": Timestamp.now(),
              "_30mw_deleted": false,
              "_30mw_updatedAt": Timestamp.now(),
              "access to all": true,
              "name": "developer",
              "read all only": false
          }).then((_doc)=>{
              addDoc(collection(db, "_30mw_admins"), {
                  "_30mw_createdAt": Timestamp.now(),
                  "_30mw_deleted": false,
                  "_30mw_updatedAt": Timestamp.now(),
                  "accepted": true,
                  "email": signup.email,
                  "fullName": signup.name,
                  "password": signup.password,
                  "rule": _doc.id
              })
          })
          addDoc(collection(db, "_30mw_admins_rules"), {
              "_30mw_createdAt": Timestamp.now(),
              "_30mw_deleted": false,
              "_30mw_updatedAt": Timestamp.now(),
              "access to all": true,
              "name": "admin",
              "read all only": false
          })

        }).then(()=>{
          setNewDashboard(false)
          router.push("/dashboard/login")
        })

  }


  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="relative flex flex-col">
    <div className="flex flex-col w-full">
      {
        newDashboard !== null &&
        (

        newDashboard ? 
        
        <Card className="min-w-[400px]">
          <CardHeader>
            <h1 className="text-xl capitalize font-bold">🥳 Lets setup your dashboard</h1>
          </CardHeader>
          <CardBody className=" gap-2">
                <p>Enter your details</p>
                <p className="text-xs mb-2">please remember your credentials</p>
                <Input isRequired label="Name" placeholder="Enter your name" type="text" value={signup.name} onChange={(e)=>setSignup({...signup, name: e.target.value})} />
                <Input isRequired label="Email" placeholder="Enter your email" type="email" value={signup.email} onChange={(e)=>setSignup({...signup, email: e.target.value})} />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={signup.password}
                  onChange={(e)=>setSignup({...signup, password: e.target.value})}
                />
          </CardBody>
          <CardFooter className="flex justify-between">
            <div></div>
            <Button onClick={setup} color="primary">setup</Button>
          </CardFooter>
        </Card>
        
        :
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
        )
      }
    </div>

      </div>
    </div>  
  );
}
