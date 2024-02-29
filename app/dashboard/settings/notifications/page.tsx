"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { Avatar, Badge, Button, Card, CardBody, Chip, Divider } from '@nextui-org/react'
import { ArrowUpRight, Check } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {Tabs, Tab} from "@nextui-org/react";
import { and, collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase'
import useCollections from '@/store/30mw/collections'
import ViewField from '@/components/30mw components/DocComponents/ViewField'
import { useAdminStore } from '@/store/30mw/admin'
type Props = {}
import {Accordion, AccordionItem} from "@nextui-org/react";
import {motion} from "framer-motion"
import { cn } from '@/lib/utils'
import { Notification } from '@/types/main'



function Page({}: Props) {
  const [notifications , setNotifications] = React.useState<Notification[]>([])
  const {collections} = useCollections()
  const {admin} = useAdminStore()
  useEffect(()=>{
    if(!admin) return
    if(!admin.id) return
    getDocs(
      query(
        collection(db,"_30mw_notifications"),
        // and(
          // where("maker.id","!=",admin.id),
        // ),
        orderBy("_30mw_createdAt", "desc"),
        )
      ).then((res)=>{
      setNotifications(res.docs.map((doc)=>({...doc.data(), id: doc.id}) as Notification ).sort((a,b)=> (b._30mw_createdAt.toDate()) as any - (a._30mw_createdAt.toDate() as any) ))
    })
  },[setNotifications,admin])
  return (
        <DashboardProvider>
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[110vh] pt-8 flex-1 p-4">
          <div className="flex justify-between gap-2 ">
          <div>
            <h1 className="text-4xl my-2"> 🔔 Notifications</h1>
          </div>
          </div>
          <div className='mt-12 '>



            <Tabs aria-label="Options">
        <Tab key="history" title="✍️ History" className='flex flex-col gap-2'>

            {
              notifications.map((notification,i)=>{
                return (
                  admin &&
                  <motion.div  initial={{scale:1,x:-300,opacity:0}} key={notification.id} animate={{scale:1,x:0,opacity:1}} transition={{duration:0.3,delay:i*0.1}} className={cn('flex z-[0] flex-col gap-4')}>
                                                      <Card key={notification.id} className={cn(notification.seenBy.includes(admin.fullName) ? "opacity-80 mx-4 " : "opacity-100")}>
                                                      <CardBody className='p-4 items-start flex flex-row justify-between gap-2'>
                                                        <div>
                                                          <div className='flex gap-4'>
                                                                <Avatar src={notification.maker.photo} color="primary"></Avatar>
                                                                <div >
                                                                  <div className='flex gap-2'>
                                                                    <Chip size='sm'  >{notification.action}</Chip>
                                                                    <p className="font-medium capitalize ">{notification.maker.fullName}</p>
                                                                  </div>
                                                                  <p className="text-sm">{notification.maker.fullName} has {notification.action} a document in {notification.collection}</p>
                                                                <p className='flex gap-4 text-sm '>{(notification._30mw_createdAt as any).toDate().toLocaleString()} : <Link className='flex gap-2 text-md items-center' href={"/dashboard/"+notification.collection+"/"+notification.document}>Open Document <ArrowUpRight size={16}/></Link></p>
                                                                </div>
                                                          </div>
                                                        </div>
                                              {
                                                notification.action == "update" && 
                                              <Accordion className='flex-1' variant='splitted'>
                                                <AccordionItem key="1" aria-label="Accordion 1" title="See Details" className=''>
                                                  <div className='flex gap-2'>

                                                        <div className='mr-auto bg-green-50 py-2 ml-4 border rounded-xl flex-1 flex flex-col h-full px-4 gap-2'>
                                                          new updates
                                                          {
                                                            collections.find(_=>_.name===notification.collection)
                                                            ?.structure.map((field)=>{
                                                              return(
                                                                deepEqual(notification.data.document[field.name] , notification.data.newDocument[field.name]) ? null : (
                                                                  <div  key={field.name} className=''>
                                                                  <ViewField index={[ field.name]} field={field} document={notification.data.newDocument} setDocument={()=>{}} />
                                                                  </div>
                                                                )
                                                              )
                                                            }
                                                            )
                                                          }
                                                        </div>
                                                        <div className='mr-auto bg-red-50 py-2  border rounded-xl  flex-1 flex flex-col h-full px-4 gap-2'>
                                                          old document
                                                          {
                                                            collections.find(_=>_.name===notification.collection)
                                                            ?.structure.map((field)=>{
                                                              return(
                                                                deepEqual(notification.data.document[field.name] , notification.data.newDocument[field.name]) ? null : (
                                                                  <div  key={field.name} className=''>
                                                                  <ViewField index={[ field.name]} field={field} document={notification.data.document} setDocument={()=>{}} />
                                                                  </div>
                                                                )
                                                              )
                                                            }
                                                            )
                                                          }
                                                        </div>
                                                  </div>
                                              </AccordionItem>
                                            </Accordion>
                                              }



                                                        {
                                                          admin &&
                                                          !notification.seenBy.includes(admin.fullName) ? <Button onClick={
                                                            /// mark as read , 😗
                                                            ()=>{
                                                              updateDoc(doc(db,"_30mw_notifications",notification.id),{
                                                                seenBy : [...notification.seenBy,admin.fullName]
                                                              }).then(()=>setNotifications(notifications.map(_=>_.id===notification.id ? {...notification, seenBy : [...notification.seenBy,admin.fullName]} : _)))
                                                            }
                                                          } startContent={<Check size={16}/>}>Mark as read</Button> : null
                                                        }
                                                        
                                                      </CardBody>
                                                    </Card>
                              </motion.div>
                )
              })
            }

        </Tab>
      </Tabs>

          </div>
        </div>
      </div>
      </DashboardProvider>
  )
}




function deepEqual(obj1:any, obj2:any) {
    // Check if they are equal primitives
    if (obj1 === obj2) return true;

    // Check if both are objects
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        // Get the keys of both objects
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // If number of keys is different, objects are not equal
        if (keys1.length !== keys2.length) return false;

        // Check if all keys and values are equal recursively
        for (let key of keys1) {
            if (!deepEqual(obj1[key], obj2[key])) return false;
        }

        return true;
    }

    // If not objects, return false
    return false;
}




export default Page