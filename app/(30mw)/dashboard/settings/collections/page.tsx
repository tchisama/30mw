"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import AddCollection from '@/components/30mw components/collections/AddCollection'
import CollectionLibrary from '@/components/30mw components/collections/CollectionLibrary'
import  SettingCollPage  from '@/components/30mw components/collections/RowRender'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { db } from '@/firebase'
import { useAdminStore } from '@/store/30mw/admin'
import useCollections from '@/store/30mw/collections'
import { CollectionType } from '@/types/collection'
import { Button } from '@nextui-org/react'
import { addDoc, collection } from 'firebase/firestore'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'

type Props = {}

function Page({}: Props) {
  const { collections , selectedCollection } = useCollections()


  const { selectedRule} = useAdminStore()
  const [haveAccess, setHaveAccess] = React.useState(false)
  useEffect(() => {
    if(!selectedRule) return
    const access = ()=>{
        if(selectedRule.name === "developer" ){
          return true
        }else{
          return false
        }
    }
    setHaveAccess(access())
  },[ selectedRule, selectedCollection])




  return (
    <DashboardProvider>
    <div className="flex gap-8">
      <SideNavbar />
      <div className='flex-1'>
      <div className="min-h-screen">
          {
            haveAccess ?
			<div className="px-4 max-w-[2400px] min-h-[110vh] mx-auto py-8 relative flex gap-2">
				<div className="flex-1">
          <div className="flex justify-between">
            <div className='flex items-end gap-2 mb-24'>
              <h1 className="text-5xl font-bold capitalize">🗃️ collections</h1>
              <h1 className="text-xl">Manager</h1>
            </div>
            <div className='flex gap-2'>
              <CollectionLibrary />
              <AddCollection />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-4 gap-3  ">
            {
              collections && collections
              .filter((c:CollectionType)=>!c?.for_30mw)
              .map((c:CollectionType,i)=>{
                return (
                  <SettingCollPage key={c.id} c={c} i={i} />
                )
              })
            }
          </div>
				</div>
			</div>
      :
      <div className="px-4 max-w-[2400px] text-lg min-h-[110vh] mx-auto py-8 flex-col relative flex gap-2 justify-center items-center">
            <span className="text-6xl">🗝️</span>
            access denied
            <span className='text-sm max-w-[300px] text-center'>make sure you have access , you should have developer role</span> 
      </div>
          }
		</div>
      </div>
    </div>
    </DashboardProvider>
  )
}

export default Page