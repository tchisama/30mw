"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { Badge, Button, Card, CardBody, Chip, Divider } from '@nextui-org/react'
import { ArrowUpRight, Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {Tabs, Tab} from "@nextui-org/react";
type Props = {}

function page({}: Props) {
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
        <Tab key="all" title="All">
              <Card>
                <CardBody className='p-4 items-center flex flex-row justify-between'>
                  <div>
                    <div className='flex gap-4'>
                    <p className="text-xl font-medium ">tchisama</p>
                    <Chip color="success" >Update</Chip>
                    </div>
                    <p className='flex gap-4'>updated the document : <Link className='flex gap-2 items-center' href={"/collections/home"}>click here <ArrowUpRight size={16}/></Link></p>
                  </div>
                  <Divider className='h-full' orientation="vertical" />
                  <Button startContent={<Check size={16}/>}>Mark as read</Button>
                </CardBody>
              </Card>
        </Tab>
        <Tab key="new" title="New">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="System" title="System">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>

          </div>
        </div>
      </div>
      </DashboardProvider>
  )
}

export default page