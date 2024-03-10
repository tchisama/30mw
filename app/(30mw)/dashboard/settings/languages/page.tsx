"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import Text from '@/components/30mw components/language/Text'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { cn } from '@/lib/utils'
import { Button, Card, CardBody, CardHeader, Input, Switch } from '@nextui-org/react'
import { Edit, Edit2, Languages, Lock, MoonIcon, SunIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function Page({ }: Props) {


  const [editMode, setEditMode] = useState(false)

  return (
    <DashboardProvider>
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[100vh] pt-8 flex-1 p-4">
          <div className="flex justify-between items-center relative gap-2 bg-white z-40">
            <div className='flex gap-4 flex-1 items-center'>
              <h1 className="text-4xl my-2 font-bold">🌐  Languages </h1>
            </div>

          </div>
          <div className='flex gap-4  my-8'>
            <div className='w-fit' onClick={() => setEditMode(!editMode)}>
            <Card className={cn(' cursor-pointer   duration-300 w-fit min-w-[300px] border-2 border-primary/0 ', editMode ? 'border-primary-300 bg-primary-50' : '')}>
              <CardHeader className='flex flex-col gap-2 items-start'>
                <h1 className='text-2xl font-medium'>Edit Mode</h1>
                <p className='max-w-[300px] text-xs text-gray-500'>by set the edit mode on , you can return to your website and edit your website content in real time</p>
              </CardHeader>
                <CardBody>
                <Switch
                  isSelected={editMode}
                  onValueChange={setEditMode}
                  size="lg"
                  color="primary"
                  thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                      <Edit2 size={16} className={className} />
                    ) : (
                      <Lock size={16} className={className} />
                    )
                  }
                >
                  <div className='text-sm'>
                    {/* Edit Mode {editMode ? 'On' : 'Off'} */}
                  </div>
                </Switch>
                </CardBody>
            </Card>
            </div>
            <Card className='flex-1'>
                <CardHeader className='flex flex-col gap-2 items-start'>
                  <h1 className='text-2xl font-medium flex gap-3 items-center'><Languages size={24} /> Languages</h1>
                  <p className='max-w-[300px] text-xs text-gray-500'>by set the edit mode on , you can return to your website and edit your website content in real time</p>
                </CardHeader>
              <CardBody className=''>

              </CardBody>
            </Card>
          </div>


<div>
      {
        
      }
</div>



          <Button onClick={() => setEditMode(!editMode)}>
            <Text id="click me" language="English"/>
          </Button>

        </div>
      </div>
    </DashboardProvider>


  )
}

export default Page