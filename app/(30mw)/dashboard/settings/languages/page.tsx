"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import Text from '@/components/30mw components/language/Text'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { cn } from '@/lib/utils'
import { Button, Card, CardBody, CardHeader, Input, Switch } from '@nextui-org/react'
import { Edit, Edit2, Lock, MoonIcon, SunIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function Page({ }: Props) {



    const [content, setContent] = useState('Type here to edit');

  const handleContentChange = (event:any) => {
    setContent(event.target.value);
  };

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
          <div>
            <div className='w-fit' onClick={() => setEditMode(!editMode)}>
            <Card className={cn(' cursor-pointer hover:bg-slate-50 mt-8 duration-300 w-fit min-w-[500px] border-2 border-primary/0 ', editMode ? 'border-primary' : '')}>
              <CardHeader className='flex flex-col gap-2 items-start'>
                <h1 className='text-3xl font-medium'>Edit Mode</h1>
                <p className='max-w-[500px] text-sm text-gray-500'>by set the edit mode on , you can return to your website and edit your website content in real time</p>
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
                  Edit Mode {editMode ? 'On' : 'Off'}
                </Switch>
                </CardBody>
            </Card>
            </div>
          </div>

          <Button onClick={() => setEditMode(!editMode)}>
            <Text id="en" language="English"/>
          </Button>
            <Text id="en" language="English"/>


            <Text id="en" language="English">
              {value=> <Input label={value} placeholder={value}></Input>}
            </Text>


        </div>
      </div>
    </DashboardProvider>


  )
}

export default Page