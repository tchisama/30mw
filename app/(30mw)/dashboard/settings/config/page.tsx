"use client"
import UploadImage from '@/components/30mw components/DocComponents/UploadImage'
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { db } from '@/firebase'
import { Button, Card, CardBody, CardHeader, Image, Input } from '@nextui-org/react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Check } from 'lucide-react'
import React, { useEffect } from 'react'
// import Page from '../trash/page'

type Props = {}

const Page = (props: Props) => {
  return (
        <DashboardProvider>
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[110vh] pt-8 flex-1 p-4">
          <div className="flex justify-between gap-2 ">
            <div>
              <h1 className="text-4xl my-2  font-bold">⚙️ Config</h1>
            </div>
          </div>
          <div className='mt-8'>
            <BrandCard />
          </div>
        </div>

      </div>
    </DashboardProvider>
  )
}






const BrandCard = ()=>{
  const [configBrand, setConfigBrand] = React.useState<any>({})
  useEffect(()=>{
    getDoc(doc(db, "config", "brand")).then(doc=>{
      setConfigBrand(doc.data())
    })
  },[])
  return(
            <Card className="max-w-[500px] ">
              <CardHeader>
                <h1 className="text-2xl">🎨 Brand</h1>
              </CardHeader>
              <CardBody className='flex relative flex-col gap-2'>
                  <Button className='absolute top-2 right-2' isIconOnly color='primary' onClick={
                    ()=>{
                      updateDoc(
                        doc(db, "config", "brand"),
                        {
                          logo: configBrand.logo,
                          brandName: configBrand.brandName,
                          sologoName: configBrand.sologoName
                        }
                      )
                    }
                  } ><Check size={16} /></Button>
                <span className='text-sm'>Logo image</span>
                <UploadImage folder='brand' returnImage={(url:string)=>setConfigBrand({...configBrand,logo:url})}>
                  {
                    ({id,loading})=>{
                      return(
                      <button onClick={
                        ()=>{
                          document.getElementById(id)?.click()
                        }
                      } className='w-[100px] h-[100px] border rounded-xl bg-slate-100'>
                      <Image className='w-full h-full object-contain' width={100} height={100} alt="logo" src={configBrand?.logo} ></Image>
                      </button>
                      )
                    }
                  }

                </UploadImage>
                <Input value={configBrand?.brandName} onChange={(e)=>setConfigBrand({...configBrand,brandName:e.target.value})} labelPlacement="outside" placeholder='ex. 30MW' label="Brand Name" />
                <Input value={configBrand?.sologoName} onChange={(e)=>setConfigBrand({...configBrand,sologoName:e.target.value})} labelPlacement="outside" placeholder='ex. 30 minutes website' label="sologo Name" />
              </CardBody>
            </Card>
  )
}




export default Page