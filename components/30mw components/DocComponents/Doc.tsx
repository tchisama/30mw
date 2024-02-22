"use client"
import { CollectionType, Field } from '@/types/collection';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react'
import ViewField from './ViewField';
import Controllers from './Controllers';
import useCollections from '@/store/30mw/collections';

type Props = {
  doc: any
}

function Doc({doc}: Props) {
  const [document, setDocument] = React.useState<any>(doc);
  const {selectedCollection} = useCollections()
  console.log(selectedCollection)
  return (
    selectedCollection &&
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
        <Controllers document={document} setDocument={setDocument} collection={selectedCollection}/>
      </CardHeader>
      <Divider/>
      <CardBody className='space-y-1 bg-slate-300/5 '>
        {
          selectedCollection.structure.map((field: Field, index) => {
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