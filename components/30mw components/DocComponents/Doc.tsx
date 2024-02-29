"use client"
import { CollectionType, Field } from '@/types/collection';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React, { useEffect } from 'react'
import ViewField from './ViewField';
import Controllers from './Controllers';
import useCollections from '@/store/30mw/collections';
import { ArrowUpRight, Trash, Undo2 } from 'lucide-react';
import Link from 'next/link';
import { deleteDoc, doc as docRef, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { update } from 'firebase/database';

type Props = {
  doc: any
  readOnly : boolean
  coll?: CollectionType
}

function Doc({doc , readOnly , coll}: Props) {
  const [document, setDocument] = React.useState<any>(doc);
  const {selectedCollection} = useCollections()
  const [collection , setCollection] = React.useState<CollectionType>()

  useEffect(() => {
    if(!coll){
      setCollection(selectedCollection)
    }else{
      setCollection(coll)
    }
  },[coll,selectedCollection])


  // console.log(selectedCollection)
  return (
    collection &&
    <Card className=''>
      <CardHeader className='flex justify-between'>
        <div className="flex flex-col text-lg capitalize font-medium">
          <span className=''>
            Customer
          </span>
          <span className='text-sm opacity-70'>
            {document._30mw_createdAt.toDate().toDateString()} - {document._30mw_createdAt.toDate().toLocaleTimeString()}
          </span>
        </div>
        {
          !document._30mw_deleted &&
          <Link href={collection.href+"/"+document.id} className='ml-auto mr-1' >
            <Button variant='bordered' isIconOnly ><ArrowUpRight size={16}/></Button>
          </Link>
        }
        {
          readOnly && !document._30mw_deleted &&
        <Controllers document={document} setDocument={setDocument} collection={collection}/>
        }
        {
          document._30mw_deleted &&
          <div className='flex gap-2'>
          <Button onPress={
            ()=>{
              if(window.confirm("Are you sure you want to restore this document?")){
                deleteDoc(
                  docRef(db, collection.collection, document.id)
                ).then(()=>{
                  window.location.reload()
                })
              }
            }
          } isIconOnly color='danger' className=''><Trash size={16}/></Button>
          <Button onPress={()=>{
            updateDoc(
              docRef(db, collection.collection, document.id),{
                _30mw_deleted : false
              }
            ).then(()=>{
              window.location.reload()
            })
          }} isIconOnly color={"primary"}><Undo2 size={16}/></Button>
          </div>
        }
      </CardHeader>
      <Divider/>
      <CardBody className='space-y-1 bg-slate-300/5 '>
        {
          collection.structure.map((field: Field, index) => {
            return (
              <ViewField key={field.name} field={field} index={[field.name]} document={document} setDocument={setDocument} />
            );
          })
        }
      </CardBody>
    </Card>
  )
}










export default Doc