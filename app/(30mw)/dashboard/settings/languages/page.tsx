"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import Text, { flags } from '@/components/30mw components/language/Text'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { cn } from '@/lib/utils'
import useLanguages from '@/store/30mw/languages'
import { Button, Card, CardBody, CardHeader, Chip, Input, Select, SelectItem, Switch } from '@nextui-org/react'
import { Selection } from '@tiptap/pm/state'
import { Badge, Check, Edit, Edit2, Languages, Lock, MoonIcon, SunIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import { update } from 'firebase/database'
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
type Props = {}

function Page({ }: Props) {


  const [editMode, setEditMode] = useState(false)
  const {languages} = useLanguages()
  const languagesLabels = [
    // "English",
    "French",
    "Arabic",
    "Portuguese",
    "Spanish",
    "German",
    "Japanese",
    "Chinese",
    "Russian"
  ]


  const [selectedLanguages, setSelectedLanguages] = React.useState(new Set([]));
  const [defaultLanguage, setDefaultLanguage] = React.useState("English");
  useEffect(() => {
    onSnapshot(doc(db, "config" , "languages"), (doc) => {
      setSelectedLanguages(new Set([...(doc.data() as any).langList ] as any))
    })
  },[])

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
            <div className='w-fit h-full' onClick={() => setEditMode(!editMode)}>
            <Card className={cn('h-full cursor-pointer   duration-300 w-fit min-w-[300px] border-2 border-primary/0 ', editMode ? 'border-primary-300 bg-primary-50' : '')}>
              <CardHeader className='flex flex-col gap-2 items-start'>
                <h1 className='text-2xl font-medium'>Edit Mode</h1>
                <p className='max-w-[400px] text-xs text-gray-500'>by set the edit mode on , you can return to your website and edit your website content in real time , make sure you have at least one language content</p>
              </CardHeader>
                <CardBody>
                
                <Switch
                  isSelected={editMode}
                  onValueChange={setEditMode}
                  size="lg"
                  color="primary"
                  
                  className='shadow-xl w-[60px] rounded-full border-2 border-primary-200'
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
            <Card className='flex-1 max-w-2xl'>
                <CardHeader className='flex flex-col gap-2 items-start'>
                  <h1 className='text-2xl font-medium flex gap-3 items-center'><Languages size={24} /> Languages</h1>
                  <p className='max-w-[500px] text-xs text-gray-500'>you can add languages to your website here , you need to have at least one language content already added</p>
                </CardHeader>
              <CardBody className=' flex flex-col gap-2'>
                      {/* <Select
                        label="Choose default Language"
                        placeholder="Select default language"
                        className=""
                        size='sm'
                      >
                        {languagesLabels.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </Select> */}
                <div className="flex gap-2">

                  {/* <div className='p-3 bg-slate-50 border w-full rounded-xl h-full gap-2 flex'>
                    {
                      ["English", "French", "Arabic"].map((_, i) => <div color='secondary' className='bg-white border p-2 items-center flex gap-2 rounded-xl ' key={i} >{_} <Button className='w-6 h-6 p-0' size='sm' isIconOnly ><X size={14}/></Button></div>)
                    }
                  </div> */}

                      <Select
                        label="Choose Languages"
                        placeholder="Select a language"
                        selectionMode="multiple"
                        className=""
                        size='sm'
                        selectedKeys={selectedLanguages}
                        onSelectionChange={setSelectedLanguages as any}
                      >
                        {languagesLabels.map((lang) => (
                          <SelectItem key={lang} value={lang} startContent={<span className={`fi fi-${flags[lang as keyof typeof flags]}`}></span>}>
                            {lang}
                          </SelectItem>
                        ))}
                      </Select>
                      <Button onClick={
                        () => {
                          const a: string[] = []
                          selectedLanguages.forEach((lang) => {
                            a.push(lang)
                          })
                          try {
                            const test = updateDoc(doc(db, "config", "languages"), {
                              langList:a
                            })
                          } catch (error) {
                            setDoc(doc(db, "config", "languages"), {
                              langList:a
                            })
                          }
                        }
                      } size="lg" color="primary" startContent={<Check size={26}/>}>
                        Apply
                      </Button>
                </div>
              </CardBody>
            </Card>
          </div>



          <h1 className='text-2xl font-medium'>Content</h1>
          <Table aria-label="Example static collection table" className='mt-4'>
            <TableHeader>
              <TableColumn >id</TableColumn>
              {
                languages &&
                ["English",...Array.from(selectedLanguages)].map((key) => (
                  <TableColumn key={key}>{key}</TableColumn>
                )) as any
              }
            </TableHeader>
            <TableBody>
              {
                languages &&
                Object.keys(languages?.English ?? {})?.map((key) => (
                  <TableRow key="1">
                    <TableCell className='w-[150px] font-medium'>@{key}</TableCell>
                    {
                      ["English",...Array.from(selectedLanguages)].map((lang,i) => (
                        <TableCell key={lang} className={cn('w-[200px]')}>{
                          // check exists
                          languages[lang] &&
                          key in languages[lang] ?
                        // languages[lang][key] 
                        <Text id={key} language={lang as any}></Text>
                        : <Chip size="sm" >no value</Chip>
                        }</TableCell>
                      )) as any
                    }
                  </TableRow>
                ))
              }
            </TableBody>

          </Table>



          <Text id='hello word' language='French'></Text>
          <Text id='how are you' language='Portuguese'></Text>

        </div>
      </div>
    </DashboardProvider>


  )
}





export default Page