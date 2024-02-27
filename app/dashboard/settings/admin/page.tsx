"use client"
import CollectionPage from "@/components/30mw components/PageItems/CollectionPage";
import SideNavbar from "@/components/30mw components/SideNavbar";
import DashboardProvider from "@/components/30mw components/providers/DashboardProvider";
import useCollections from "@/store/30mw/collections";
import { Button, Card, Divider, Input, useDisclosure } from "@nextui-org/react";
import React, { useEffect } from "react";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
const Home = () => {
  const { collections, selectedCollection } = useCollections();
  return (
    <DashboardProvider>
      {
        collections.length > 0 && selectedCollection &&
        <div className="flex gap-8">
          <SideNavbar />
          <div className='flex-1'>
            <div className="min-h-screen">
              <div className="px-4 max-w-[2400px] min-h-[110vh] mx-auto py-8 relative flex gap-2">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h1 className="text-5xl font-medium capitalize">🔐 admins</h1>
                    <CreateNewUser />
                  </div>
                  <Divider className="my-8" />
                  <div>
                    <Link href={"/dashboard/settings/users/rules"}>
                    <Card className="w-fit p-4 flex flex-row gap-4">
                      <div className="text-4xl">🗝️</div>
                      <div className="flex-1">
                        <div className="text-3xl font-medium flex justify-between">Rules<ArrowUpRight /></div>
                        <div className="text-sm text-gray-600">Manage rules and create new ones</div>
                      </div>
                    </Card>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </DashboardProvider>
  );
};








const CreateNewUser = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [fullName , setFullName] = React.useState("")
  const [email , setEmail] = React.useState("")
  const [password , setPassword] = React.useState("")
  const [error , setError] = React.useState({
    fullName:false,
    email:false,
    password:false
  })
  // const [start, setStart] = React.useState(false)


  const createUser = (onClose:Function) => {
    if(!fullName || !email || !password){
      setError({
        fullName:!fullName,
        email:!email,
        password:!password
      })
      return 
    }
    addDoc(collection(db,"_30mw_admins"),{
      fullName,
      email,
      password,
      _30mw_createdAt:Timestamp.now(),
      _30mw_updatedAt:Timestamp.now(),
      rule:"admin",
      _30mw_deleted:false
    }).then(()=>{
      onClose()
      setFullName("")
      setEmail("")
      setPassword("")
      setError({
        fullName:false,
        email:false,
        password:false
      })
    })
  }
  // useEffect(()=>{
  //     if(error.fullName){
  //       setError(p=>{
  //         return {...p,fullName:true}
  //       })
  //     }
  // },[fullName,email,password,setError,error.fullName])

  return (
    <>
      <Button   onPress={onOpen} variant="shadow" size="lg" color="primary">✨ new</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                  <Input isInvalid={error.fullName} errorMessage={error.fullName ? "Full Name is required" : ""} value={fullName} onChange={(e)=>setFullName(e.target.value)} label="Full Name" />
                  <Input  isInvalid={error.email} errorMessage={error.email ? "Email is required" : ""} value={email} onChange={(e)=>setEmail(e.target.value)} label="Email" />
                  <Input  isInvalid={error.password} errorMessage={error.password ? "Password is required" : ""} value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{createUser(onClose)}}>
                  create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}






export default Home;
