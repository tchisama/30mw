"use client"
import { CollectionType, Field, UserCollection, me as me_} from '@/types/collection';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react'
import ViewField from './ViewField';
import Controllers from './Controllers';

type Props = {
  doc: any
}

function Doc({doc}: Props) {
  const [document, setDocument] = React.useState<any>(doc);
  return (
    <Card className=''>
      <CardHeader className='flex justify-between'>
        <div className="flex flex-col text-lg capitalize font-medium">
          <span className=''>
            Customer
          </span>
          <span className='text-sm opacity-70'>
              2/21/2024, 7:16:35 PM
          </span>
        </div>
        <Controllers document={document} setDocument={setDocument} collection={UserCollection}/>
      </CardHeader>
      <Divider/>
      <CardBody className='space-y-1 bg-slate-300/5 '>
        {
          UserCollection.structure.map((field: Field, index) => {
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