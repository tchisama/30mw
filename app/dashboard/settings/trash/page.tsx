"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import React, { useEffect } from 'react'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import useCollections from '@/store/30mw/collections';
import { CollectionType } from '@/types/collection';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import Doc from '@/components/30mw components/DocComponents/Doc';
import { useAdminStore } from '@/store/30mw/admin';

type Props = {}

function Page({ }: Props) {
  const {collections} = useCollections()
  const {admin , selectedRule} = useAdminStore()
  const [selected, setSelected] = React.useState("photos");

  const [docs, setDocs] = React.useState<any[]>([]);
  useEffect(() => {
    const get = async () => {
      setDocs([])
      const docs = await getDocs(
        query(
          collection(db, selected),
          where("_30mw_deleted", "==", true)
          )
        );
      setDocs(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    get();
  },[selected])
  return (
    <DashboardProvider>
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[110vh] pt-8 flex-1 p-4">
          <div className="flex justify-between gap-2 ">
            <div>
              <h1 className="text-4xl my-2"> 🗑️ Trash</h1>
            </div>
          </div>
                <Tabs selectedKey={selected} onSelectionChange={setSelected as any} aria-label="Options" className='mt-8'>
                  {
                    selectedRule &&
                    collections
                    .filter(c=> !(c?.for_30mw && !(selectedRule.name === "developer")) )
                    .filter(c=>{
                      if(selectedRule['access to all '] ){
                        if(!selectedRule["but collections"]){
                          return true
                        }else if(!selectedRule["but collections"].find(_=>_['collection name'] === c?.name)){
                          return true
                        }else{
                          return false
                        }
                      }else{
                        if(!selectedRule["but collections"]){
                          return false
                        }else if(!selectedRule["but collections"].find(_=>_['collection name'] === c?.name)){
                          return false
                        }else{
                          return true
                        }
                      }
                  })
                    .map((_collection,i)=>{
                      return (
                        <Tab key={_collection.name} title={ _collection.icon + _collection.name}>
                                  {
                                    docs.length === 0 && <div className="text-center h-[50vh] flex items-center justify-center w-full flex-col gap-2 text-3xl">
                                      <span>🗑️</span>
                                      No documents
                                    </div>
                                  }
                                <div className='py-5 mt-6 grid gap-4 grid-cols-3 3xl:grid-cols-4 '>

                                  {
                                    docs.length > 0 &&
                                    docs.map((doc,i)=>{
                                      return (
                                        <Doc doc={doc} readOnly key={i} coll={_collection} />
                                      )
                                    })
                                  }
                                </div>
                        </Tab>
                      )
                    })
                  }
                </Tabs>
        </div>
      </div>
    </DashboardProvider>
  )
}

export default Page