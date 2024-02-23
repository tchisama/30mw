"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import AddCollection from '@/components/30mw components/collections/AddCollection'
import  SettingCollPage  from '@/components/30mw components/collections/RowRender'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { db } from '@/firebase'
import useCollections from '@/store/30mw/collections'
import { CollectionType } from '@/types/collection'
import { Button } from '@nextui-org/react'
import { addDoc, collection } from 'firebase/firestore'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

function Page({}: Props) {
  const { collections } = useCollections()

  return (
    <DashboardProvider>
    <div className="flex gap-8">
      <SideNavbar />
      <div className='flex-1'>
        		<div className="min-h-screen">
			<div className="px-4 max-w-[2400px] min-h-[110vh] mx-auto py-8 relative flex gap-2">
				<div className="flex-1">
          <div className="flex justify-between">
            <div className='flex items-end gap-2 mb-24'>
              <h1 className="text-4xl capitalize">🗃️ collections</h1>
              <h1 className="text-xl">Manager</h1>
            </div>
            <AddCollection />
          </div>
          <div className="grid grid-cols-2 mt-4 gap-6  ">
            {
              collections && collections.map((c:CollectionType,i)=>{
                return (
                  <SettingCollPage key={i} c={c} i={i} />
                )
              })
            }
          </div>

				</div>
			</div>
		</div>
      </div>
    </div>
    </DashboardProvider>
  )
}

export default Page