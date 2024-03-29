"use client"
import { db } from '@/firebase'
import { cn } from '@/lib/utils'
import { useAdminStore } from '@/store/30mw/admin'
import useCollections from '@/store/30mw/collections'
// import { CollectionType, usersColl } from '@/types/collection'
import { Avatar, Button, Card, Divider, Image, User } from '@nextui-org/react'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { ChevronLeft, Home, ImageIcon, LogOut, Settings, User2 } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import path from 'path'
import React, { useEffect } from 'react'
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import { Reorder } from 'framer-motion'
type Props = {}

function SideNavbar({}: Props) {
  const {collections, setCollections ,setSelectedCollection} = useCollections()
  const pathname = usePathname()


  const {admin , selectedRule} = useAdminStore()

  const [configBrand, setConfigBrand] = React.useState<any>({})
  useEffect(()=>{
    getDoc(doc(db, "config", "brand")).then(doc=>{
      setConfigBrand(doc.data())
    })
  },[])

  const params = useParams()
  const [collapsed, setCollapsed] = React.useState(true)
  return (
      <div className='flex sticky top-10 min-h-[90vh] h-fit duration-200 z-20  flex-row-reverse items-center'>
        <button className='bg-slate-50 rounded-r-xl border pl-0 p-1 py-3 ' onClick={() => setCollapsed(!collapsed)} >
          <ChevronLeft size={16} className={cn("duration-200",{"rotate-180":!collapsed})}/></button>
        <Card className='w-fit p-4 h-full min-h-[90vh] '>
          <div className='flex justify-center items-center gap-4'>
            <div className=' w-12 h-12 rounded-2xl bg-slate-50 border shadow-xl'>
              {
                configBrand?.logo ?
              <Image src={configBrand?.logo}  width={48} height={48} alt="logo" />
              :
              <ImageIcon size={24} strokeWidth={1} className='relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'/>
              }
            </div>
                              {
            collapsed &&
            <div className='flex-1'>
              <div className='font-bold capitalize text-md'>{configBrand?.brandName  ?? "No Name"}</div>
              <div className='text-xs max-w-[150px]'>{configBrand?.sologoName ?? "No Sologan"} </div>
            </div>
              }
          </div>
          <div className='mt-8 flex flex-col gap-1'>
                <Link href={"/dashboard"} className='w-full' >
                <div className={cn('flex hover:bg-slate-100 bg-slate-50 duration-200 cursor-pointer items-center border hover:border-slate-300 border-slate-900/5 rounded-xl px-2 pl-2 py-2 gap-4',{"bg-primary hover:bg-primary/90 text-white":(pathname == "/dashboard" || pathname.includes("/dashboard/settings/"))})}>
                  {/* <Home size={24} strokeWidth={1}/> */}
                  <div className='text-2xl bg-white shadow w-10 h-10 flex items-center justify-center rounded-lg'>🚀</div>
                  {
                    collapsed &&
                  <div className=''>
                    <div className='font-medium capitalize'>Dashboard</div>
                    <div className='text-xs '> Config your dashboard</div>
                  </div>
                  }
                </div>
                </Link>
                <Divider  className='my-2'/>
                {
                  selectedRule!==null &&
                  collections
                  .filter(c=>!c?.motherCollection && !c?.for_30mw)
                  .filter(c=>{
                    if(selectedRule['name']=== "developer"){
                      return true
                    }
                    if(selectedRule['access to all '] ){
                      if(!selectedRule["but collections"]){
                        return true
                      }else if(!selectedRule["but collections"].find(_=>_['collection name'] === c?.name)){
                        return true
                      }else{
                        return false
                      }
                    }else{
                      if(!selectedRule["but collections"]){
                        return false
                      }else if(!selectedRule["but collections"].find(_=>_['collection name'] === c?.name)){
                        return false
                      }else{
                        return true
                      }
                    }
                })
                  .map((_,i)=>{
                    return <Link draggable href={_?.href} key={i}>
                    <div className={cn('flex hover:bg-slate-100 bg-slate-50  duration-200 cursor-pointer items-center border hover:border-slate-300 border-slate-900/5 rounded-xl px-2 pl-2 py-2 gap-4',{"bg-primary hover:bg-primary/90 text-white":params?.collectionName === _?.collection})}>
                      {/* <Home size={24} strokeWidth={1}/> */}
                      <div className='text-2xl  shadow bg-white rounded-lg w-10 h-10 text-center flex items-center justify-center'>
                      {_?.icon}</div>
                                        {
                        collapsed &&
                      <div className=''>
                        <div className='font-medium capitalize'>{_?.name}</div>
                        <div className='text-xs '>{_?.subtitle.slice(0,22)}</div>
                      </div>
                    }
                    </div></Link>
                  })
                }
          </div>
          <div className='flex mt-auto flex-col gap-2 w-full items-start'>
                <Dropdown>
                  <DropdownTrigger>
                    

             <div className={cn('flex hover:bg-slate-100 bg-slate-50 rounded-xl w-full duration-200 cursor-pointer items-center border hover:border-slate-300 border-slate-900/5  px-2 pl-2 py-2 gap-4')}>
              {
                !collapsed ?
                <Avatar src={admin?.photo}></Avatar>
                :
                <User 
                        name={  admin?.fullName}
                        description={admin?.email}
                        avatarProps={{
                          src: admin?.photo
                        }}
                ></User> 
              }
             </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={
                      ()=>{
                        window.location.href = `/dashboard/_30mw_admins/${admin?.id}`
                      }
                    } key="new" startContent={<User2 size={16} />}>Open Profile</DropdownItem>
                    <DropdownItem onClick={()=>{
                      localStorage.removeItem("_30mw_admin")
                      window.location.reload()
                    }} key="edit" startContent={<LogOut size={16} />}> Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
          </div>

        </Card>
      </div>
  )
}

export default SideNavbar