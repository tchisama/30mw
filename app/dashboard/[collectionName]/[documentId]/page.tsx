"use client"
import Controllers from '@/components/30mw components/DocComponents/Controllers'
import ViewField from '@/components/30mw components/DocComponents/ViewField'
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { db } from '@/firebase'
import { useAdminStore } from '@/store/30mw/admin'
import useCollections from '@/store/30mw/collections'
import { Field } from '@/types/collection'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Tabs, Tab } from "@nextui-org/react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Home } from 'lucide-react'
type Props = {}

function Page({ }: Props) {
  const { collections, selectedCollection } = useCollections()
  const params = useParams()
  const [document, setDocument] = React.useState<any>(null);
  useEffect(() => {
    if (!params.collectionName || !params.documentId) return
    getDoc(doc(db, params.collectionName as string, params.documentId as string)).then((doc) => {
      setDocument(doc.data())
    })
  }, [params.collectionName, params.documentId])




  const { selectedRule } = useAdminStore()
  const [haveAccess, setHaveAccess] = React.useState(false)
  const [readOnly, setReadOnly] = React.useState(false)
  useEffect(() => {
    if (!selectedRule) return
    const access = () => {
      if (selectedRule['access to all ']) {
        setReadOnly(!selectedRule["read all only"])
        if (!selectedRule["but collections"]) {
          return true
        } else if (!selectedRule["but collections"].find(_ => _['collection name'] === selectedCollection?.name)) {
          return true
        } else {
          return false
        }
      } else {
        if (!selectedRule["but collections"]) {
          return false
        } else if (!selectedRule["but collections"].find(_ => _['collection name'] === selectedCollection?.name)) {
          return false
        } else {
          setReadOnly(selectedRule["but collections"].find(_ => _['collection name'] === selectedCollection?.name)?.["write / update"] ?? false)
          return true
        }
      }
    }
    setHaveAccess(access())
  }, [selectedRule, selectedCollection])





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
            <div>

              <Tabs aria-label="Options" className=' mt-4'>

                <Tab key="main" title="Main">

                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel className='p-6'>


                      <Card className='space-y-2 items-start w-full h-fit min-w-[500px] flex-1'>
                        <CardHeader>
                          <div className='flex-1'>
                            <h1 className='text-xl'>Customer</h1>
                            <h1 className='text-sm '>⌚ created at - {document?._30mw_createdAt.toDate().toDateString()} - {document?._30mw_createdAt.toDate().toLocaleTimeString()}</h1>
                            <h1 className='text-sm '>🖋️ last update - {document?._30mw_updatedAt.toDate().toDateString()} - {document?._30mw_updatedAt.toDate().toLocaleTimeString()}</h1>
                          </div>

                          {
                            selectedCollection && document && readOnly &&
                            <Controllers document={document} setDocument={setDocument} collection={selectedCollection} />
                          }
                        </CardHeader>
                        <CardBody className='bg-slate-50 flex flex-col gap-2'>

                          {
                            selectedCollection && document &&
                            selectedCollection.structure.map((field: Field, index) => {
                              return (
                                <ViewField key={field.name} field={field} index={[field.name]} document={document} setDocument={setDocument} />
                              );
                            })
                          }
                        </CardBody>
                      </Card>

                    </ResizablePanel>
                    <ResizableHandle withHandle  className=' rounded-xl '>
                    </ResizableHandle>
                    
                    <ResizablePanel></ResizablePanel>
                  </ResizablePanelGroup>
                
                </Tab>

                <Tab key="sections" title="sections">
                </Tab>
              </Tabs>




            </div>
          </div>
        </div>
      }
    </DashboardProvider>
  )
}

export default Page