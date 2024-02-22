"use client"
import { db } from '@/firebase'
import { cn } from '@/lib/utils'
import useCollections from '@/store/30mw/collections'
import { CollectionType, usersColl } from '@/types/collection'
import { Button, Card, User } from '@nextui-org/react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { Home, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import path from 'path'
import React, { useEffect } from 'react'

type Props = {}

function SideNavbar({}: Props) {
  const {collections, setCollections ,setSelectedCollection} = useCollections()
  const pathname = usePathname()
  // const createCollection = ()=>{
  //   addDoc(collection(db,"collections"),{
  //     ...usersColl,
  //     structure:JSON.stringify(usersColl.structure)
  //   })
  // }
  return (
      <div>
        <Card className='w-[250px] p-4 min-h-[90vh] h-fit sticky top-10'>
          <div className='flex items-center gap-4'>
            <div className='bg-slate-100 border w-12 h-12 rounded-xl'></div>
            <div className=''>
              <div className='font-bold text-md'>Logo Name</div>
              <div className='text-sm'>sologo here </div>
            </div>
          </div>
          <div className='mt-8 flex flex-col gap-1'>
            {
              collections.map((_,i)=>{
                return <Link href={_?.href} key={i}>
                <div className={cn('flex hover:bg-slate-50  duration-200 cursor-pointer items-center border hover:border-slate-300 border-slate-900/5 rounded-xl px-4 pl-3 py-2 gap-4',{"bg-primary hover:bg-primary/90 text-white":pathname === _?.href})}>
                  {/* <Home size={24} strokeWidth={1}/> */}
                  <div className='text-2xl bg-white rounded-lg w-10 h-10 text-center flex items-center justify-center'> {" "}
                  {_?.icon}</div>
                  <div className=''>
                    <div className='font-medium capitalize'>{_?.name}</div>
                    <div className='text-xs '>{_?.subtitle}</div>
                  </div>
                </div></Link>
              })
            }
          </div>
          {/* <Button className='w-full mt-4' onPress={createCollection}> Create Collection</Button> */}
          <div className='flex mt-auto flex-col gap-2 w-full items-start'>
                <Link href={"/dashboard/settings"} className='w-full' >
                <div className={cn('flex hover:bg-slate-50 duration-200 cursor-pointer items-center border hover:border-slate-300 border-slate-900/5 rounded-xl px-4 pl-3 py-2 gap-4',{"bg-primary hover:bg-primary/90 text-white":pathname.includes("/dashboard/settings")})}>
                  {/* <Home size={24} strokeWidth={1}/> */}
                  <div className='text-2xl bg-white w-10 h-10 flex items-center justify-center rounded-lg'>⚙️</div>
                  <div className=''>
                    <div className='font-medium capitalize'>Configs</div>
                    <div className='text-xs '> manage dashboard</div>
                  </div>
                </div></Link>
           <User 
                  name="Jane Doe"
                  description="Product Designer"
                  avatarProps={{
                    src: "https://i.pravatar.cc/140?u=a04258114e29026702d"
                  }}
           ></User> 
          </div>

        </Card>
      </div>
  )
}

export default SideNavbar