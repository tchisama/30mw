"use client"
import Controllers from '@/components/30mw components/DocComponents/Controllers'
import ViewField from '@/components/30mw components/DocComponents/ViewField'
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { db } from '@/firebase'
import useCollections from '@/store/30mw/collections'
import { Field } from '@/types/collection'
import { Card } from '@nextui-org/react'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

function Page({}: Props) {
  const { collections , selectedCollection } = useCollections()	
  const params = useParams()
  const [document, setDocument] = React.useState<any>(null);
  useEffect(() => {
    if(!params.collectionName || !params.documentId) return
    getDoc(doc(db,params.collectionName as string,params.documentId as string)).then((doc) => {
      setDocument(doc.data())
    })
  },[params.collectionName,params.documentId])



  return (
    <DashboardProvider>
      {
        collections.length > 0 && selectedCollection &&
        <div className="flex gap-8">
          <SideNavbar />
          <div className="min-h-[110vh] flex flex-col  flex-1">
            <div className='flex justify-between items-center'>
            <h1 className='text-3xl mt-12'>Document</h1>
            </div>
            <div className=' justify-start  gap-6 flex flex-row-reverse mt-12'>
              <div className='flex flex-col gap-2'>
              <Card  className='p-4 mb-4 w-fit h-fit'>

              <h1 className='text-xl'>Customer</h1>
              <h1 className='text-sm '>⌚ created at - {document?._30mw_createdAt.toDate().toDateString()} - {document?._30mw_createdAt.toDate().toLocaleTimeString()}</h1>
              <h1 className='text-sm '>🖋️ last update - {document?._30mw_updatedAt.toDate().toDateString()} - {document?._30mw_updatedAt.toDate().toLocaleTimeString()}</h1>
              </Card>
              <Card className='p-4 h-fit space-y-2  flex'>
              <h1 className='text-xl'>Actions</h1>
              {
                selectedCollection && document &&
              <Controllers document={document} setDocument={setDocument} collection={selectedCollection}/>
              }
              </Card>
              </div>
              <Card className='p-4 space-y-2 flex-1'>
        {
          selectedCollection && document &&
          selectedCollection.structure.map((field: Field, index) => {
            return (
              <ViewField key={field.name} field={field} index={[field.name]} document={document} setDocument={setDocument} />
            );
          })
        }
              </Card>
            </div>
          </div>
        </div>
      }
    </DashboardProvider>
  )
}

export default Page