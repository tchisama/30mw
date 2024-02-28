"use client"
import React, { useEffect, useMemo } from 'react'
import Doc from '../DocComponents/Doc'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, useDisclosure, Skeleton, Card, Divider, Accordion, AccordionItem} from "@nextui-org/react";
import { BarChart, BarChartBig, Divide, Filter, LayoutGrid, List, Plus, Search, Trash } from 'lucide-react';
import { CollectionType } from '@/types/collection';
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import CreateModal from '../DocComponents/Create';
import useCollections from '@/store/30mw/collections';
import LoadingTiming from '../LoadingTiming';


import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import Bar from './Chart';

type Props = {
  readOnly : boolean
}

const CollectionPage = ({readOnly}: Props) => {
  const [docs, setDocs] = React.useState<CollectionType[]>([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {collections, setCollections ,selectedCollection, setSelectedCollection} = useCollections()
  const [loading,setLoading] = React.useState(true)

  const [view,setView] = React.useState<"grid"|"table"|"analytics">("grid")


  useMemo(() => {
    setDocs([])
    setLoading(true)
    if(!selectedCollection.collection) return
    const q = query(collection(db,selectedCollection.collection),where('_30mw_deleted', '==', false));
    onSnapshot(q, (snapshot) => {
      setDocs(snapshot.docs.map((doc) => {
        return {...doc.data(), id: doc.id} as CollectionType
      }))
    })
    setDocs(p=>p.sort((a:any,b:any)=>new Date(b._30mw_createdAt).getTime()-new Date(a._30mw_createdAt).getTime()))
    setLoading(false)
  },[selectedCollection])

  return (
    selectedCollection && !loading &&
    <div className='flex-1'>
    <Navbar maxWidth='2xl'   isBlurred={false} height={"80px"} isBordered shouldHideOnScroll className=''>
      <NavbarBrand>
        <LoadingTiming>
          {
            (loading)=>(
                loading ?
                <Skeleton className=" h-8 text-2xl w-fit rounded-xl" >{selectedCollection.name}</Skeleton> :
                <p className="font-bold text-2xl text-inherit flex items-center gap-2 capitalize"><span className='pb-2 text-3xl'>{selectedCollection?.icon}</span> {selectedCollection.name}</p>
            )
          }
        </LoadingTiming>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">





    <Dropdown>
      <DropdownTrigger>
          <Button isIconOnly variant='bordered'>
            {
              view === "grid" ? <LayoutGrid color='#444' size={18}/> 
              : view === "table" ? <List color='#444' size={18}/>
              : <BarChartBig color='#444' size={18}/>
            }
          </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={()=>setView("grid")} startContent={<LayoutGrid color='#444' size={18}/>} key="grid">             Grid</DropdownItem>
        <DropdownItem onClick={()=>setView("table")} startContent={<List color='#444' size={18}/>} key="table">                 Table</DropdownItem>
        <DropdownItem onClick={()=>setView("analytics")} startContent={<BarChartBig color='#444' size={18}/>} key="analytics">  Analytics</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        




        <Divider orientation='vertical'  className='mx-2'/>
        <Input
          type="text"
          variant="bordered"
          placeholder={"Search in " + selectedCollection.name}
          labelPlacement="outside"
          className='w-full min-w-[400px]'
          startContent={
            <Search size={16}/>
          }
        />
        <Button isIconOnly variant='bordered'><Filter color='#444' size={18}/></Button>
        {/* <Divider orientation='vertical'  className='mx-2'/> */}
      </NavbarContent>

      <NavbarContent justify="end">
        {
          readOnly && <Button onPress={onOpen} variant='shadow' size='lg' color="primary" className='capitalize' >✨ new</Button>
        }
        
        <CreateModal collection={selectedCollection} model={{isOpen, onOpen, onOpenChange}}/>
      </NavbarContent>
    </Navbar>
    <div className='flex flex-col gap-4 mt-6'>


    <Accordion   defaultExpandedKeys={["1"]} selectionMode='multiple'>
          {
                collections.filter(c=>c?.motherCollection == selectedCollection?.collection).length > 0 &&
                <AccordionItem  className=' text-2xl  font-medium ' key="1" aria-label="Accordion 1" title={"Sub Collections ("+collections.filter(c=>c?.motherCollection == selectedCollection?.collection).length+")"}>
                  <div className='p-1 w-full'>
                    
                  {
                        collections.filter(c=>c?.motherCollection == selectedCollection?.collection)
                        .map((c,i)=>{
                          const card =                   <Link className='inline-block w-fit m-2' href={`/dashboard/${c.collection}`} >
                            <Card shadow='sm' className='p-4 inline-block w-fit bg-white gap-4  duration-200'>
                              <div className='flex gap-4'>
                                  
                                <div className='text-4xl'>{c?.icon}</div>
                                <div className='pr-4'>
                                <h2 className='text-lg capitalize font-medium'>
                                {c.name}
                                </h2>
                                <p className='text-sm'>{c.subtitle}</p>
                                </div>
                              </div>
                            </Card>
                            </Link>
                          return (
                            // <LoadingTiming key={i} >
                            //   {
                            //     (loading)=>(
                            //       loading ? <Skeleton className=" rounded-xl w-fit inline-block m-2" >{card}</Skeleton> :
                            //       card
                            //     )
                            //   }
                            // </LoadingTiming>
                            card
                          )
                        })
                  }
                  </div>
                  
                </AccordionItem> as any
          }




            <AccordionItem className=' text-2xl  font-medium ' key="2" aria-label="Accordion 2" title={"Analytics"}>
          {
            docs.length > 0 && view !== "analytics" && 
          <Card shadow='sm' className=' p-1 mx-2 w-fit cursor-pointer' onClick={(e)=>{e.preventDefault() ; setView("analytics")}}>
            <div className='h-[150px] flex  w-[400px]'>
            <Bar docs={docs}/>
            </div>
          </Card>
          }
        
            </AccordionItem>
    </Accordion>






    </div>



{
    view == "grid" &&

    <div className='py-5 mt-6 grid gap-4 grid-cols-3 3xl:grid-cols-4 '>

      {
        !loading && 
        docs.map((doc,index) => {
          return <Doc readOnly={readOnly} doc={doc} key={doc.id}/>
        })
      }
    </div>
}

{

    view == "analytics" && docs &&
    <Card className='  mt-6 p-6'>
      <div className='h-[400px]'>
      <Bar docs={docs}/>
      </div>
    </Card>
}
      {
        docs.length === 0 && 
        <div className='min-h-[50vh]  flex-1 w-full flex items-center justify-center'>
          <p className=' text-3xl w-fit'>🥲 No documents</p>
        </div>
      }
    </div>
  )
}

export default CollectionPage