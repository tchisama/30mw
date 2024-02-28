"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { Card, Divider } from '@nextui-org/react'
import { Divide } from 'lucide-react'
import React, { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Link from 'next/link'

type Props = {}

function Page({ }: Props) {
  const [selected , setSelected] = useState<number[]>([])
  return (
    <DashboardProvider>
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[110vh] pt-8 flex-1 p-4">
          <h1 className="text-4xl my-2">📁 File System</h1>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel className='p-6'>
                  {
                    new Array(20).fill(0).map((_, i) => {
                      return (
                        <Link  key={i} href={`/dashboard/settings/filesystem/${i}`}>
                          <Card shadow='md' className='w-[200px] m-2 inline-block p-2 h-[150px] cursor-pointer' >
                            <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
                              <div className='w-full h-fit text-7xl text-center my-auto'>📂</div>
                              <div className='w-full h-fit text-center text-sm'>file {i}</div>
                            </div>
                          </Card>
                        </Link>
                      )
                    })
                  }
              </ResizablePanel>
                {/* <ResizableHandle />
                <ResizablePanel className='p-6 w-[200px]'>
                  <Card className='w-full h-full'></Card>
                </ResizablePanel> */}
            </ResizablePanelGroup>


        </div>
      </div>
    </DashboardProvider>
  )
}

export default Page