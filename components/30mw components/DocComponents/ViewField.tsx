import { getValue } from '@/lib/utils/index'
import { Field } from '@/types/collection'
import { Accordion, AccordionItem, Avatar, Button, Chip, Image, Skeleton } from '@nextui-org/react'
import { MoreHorizontal, Plus, Settings } from 'lucide-react'
import React, { useEffect } from 'react'
import { fileURLToPath } from 'url'
import NextImage from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import ImageViewer from '../ImageViewer'

type Props = {
  field:Field,
  index: (string | number)[],
  document: any,
  setDocument: Function
}

function ViewField({field,index,document,setDocument}: Props) {


  const [loading, setLoading] = React.useState<boolean>(false)
  const [refDoc,setRefDoc] = React.useState<any>(null)
  useEffect(() => {
    if(field.type !== "array" && field.type !== "object"){ 
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      },300)
    }
    if(field.type === "reference"){
      try{

      getDoc(
        doc(db,field.reference.collection,getValue(index,document))
      ).then((doc)=>{
        setRefDoc(doc.data())
      })
      }catch(e){
        console.log(e)
      }
    }
  }, [field,document,index])

  if(loading) return (
      <Skeleton className="rounded-lg">
        <div className={`${field.type === "image" ? "h-44" : "h-10"} rounded-lg bg-default-300`}></div>
      </Skeleton>
  )

  if(field === null) return null


  if(field.type === "object"){
    return (
      <Accordion className=''>
      <AccordionItem className='font-medium ' key="1" aria-label="Accordion 1" title={field.name}>
        <div className=' bg-slate-400/5 p-2 border rounded-xl space-y-1'>
          {
            field.structure.map((f:Field,i)=>{
              return <ViewField key={f.name} field={f} index={[...index,f.name]} document={document} setDocument={setDocument} />
            })
          }
        </div>
      </AccordionItem>
      </Accordion>
    )
  }



  if(field.type === "array"){
    const value = getValue(index,document) ?? []
    return (
      <Accordion className='overflow-hidden '>
      <AccordionItem className='font-medium' key="1" aria-label="Accordion 1" title={field.name}>
        <div className=' space-y-1 bg-slate-400/5 p-2 border rounded-xl'>
          <Carousel >
            <CarouselContent className=''>

                { (value as any[])?.map(
                  (value, index2) => {
                
                    return (
                      <CarouselItem className='basis-4/5' key={index2 + field.name}>
                        <div key={index2 + field.name} className="rounded-xl space-y-1 my-1 ">
                          {field.structure.map((field2: Field, index3) => {
                            return <div key={index3}>
                              <ViewField key={field.name} field={field2} index={[...index,index2,field2.name]} document={document} setDocument={setDocument} />
                            </div>
                          })}
                        </div>
                      </CarouselItem>
                    );
                  }
                ) }
            </CarouselContent>
            <div className='relative gap-2 pt-4 h-8 flex justify-end'>
              <CarouselPrevious  className='static rounded-xl'/>
              <CarouselNext  className='static rounded-xl'/>
            </div>
          </Carousel>
        </div>
      </AccordionItem>
      </Accordion>
    )
  }

  if(field.type === 'image'){
    return (
      <div className='p-2 bg-white rounded-xl gap-2 flex flex-col 2xl:flex-row justify-between border '>
        <div className="flex flex-col flex-1 p-0">
          <div className='font-medium mb-2 capitalize'>{field.name}</div>
        </div>
        <div className=' bg-slate-400/5 p-2 border rounded-xl w-fit flex items-center justify-center space-y-1'>
          <ImageViewer src={getValue(index,document) ?? ""}>
          <Image
            width={200}
            height={200}
            as={NextImage}
            alt="NextUI hero Image"
            src={getValue(index,document)??""}
            className="h-[200px] object-contain w-[200px] mx-auto"
          />
          </ImageViewer>
        </div>
      </div>
    )
  }

  if(field.type === 'avatar'){
    return (
      <div className='p-2 bg-white rounded-xl gap-2 flex justify-between border '>
          <div className='font-medium capitalize'>{field.name}</div>
          <Avatar className="cursor-pointer" src={getValue(index, document)} />
      </div>
    )
  }


  if(field.type === "boolean"){
    const value = getValue(index,document)
    return (
      <div className='flex justify-between bg-white pr-2 p-2 rounded-xl border px-4'>
        <div className='font-medium capitalize'>{field.name}</div>
        <div className='flex gap-2 items-center'>

      {
        value ? <Chip isDisabled className='text-white bg-green-700'>{field?.labels?.true ?? "True"}</Chip> : <Chip isDisabled className='text-white bg-red-600'>{field?.labels?.false ?? "False"}</Chip>
      }
         {" "}
         <div className='text-sm text-gray-950/50'>
          {
            field?.prefix
          }
         </div>
        </div>
      </div>
    )
  }

  if(field.type === "date"){
    const value = getValue(index,document)
    return (
      <div className='flex justify-between font-normal bg-white pr-2 p-2 rounded-xl border px-4'>
        <div className='font-medium capitalize'>{field.name}</div>
        <div className='text-sm'>{value?.toLocaleString()}
         {" "}
         <div className='text-sm text-gray-950/50'>
          {
            field?.prefix
          }
         </div>
        </div>
      </div>
    )
  }
  
  if(field.type === "select"){
    const value = getValue(index,document)
    return (
      <div className='flex justify-between font-normal bg-white pr-2 p-2 rounded-xl border px-4'>
        <div className='font-medium capitalize'>{field.name}</div>
        <div className='text-sm'>{field.options.find((o)=>o.value===value)?.name ?? value}
         {" "}
         <div className='text-sm text-gray-950/50'>
          {
            field?.prefix
          }
         </div>
        </div>
      </div>
    )
  }


  if(field.type === "reference"){
    return (
    	<div className="flex justify-between bg-white pr-2  p-2 rounded-xl border px-4">
				<div className="font-medium capitalize">{field.name}</div>
        {
      refDoc && field.reference.collection && field.reference.key ?
        <p className=''>{refDoc[field.reference.key]}</p>
        : <p className='text-red-500'>no reference</p>
        }
			</div>
    )
  }


	if (field.type == "text") {
		return (
			<div className="flex justify-between bg-white pr-2 flex-col p-2 rounded-xl border px-4">
				<div className="font-medium capitalize">{field.name}</div>
        <p className='text-sm'>{(getValue(index,document)??"").toString().slice(0,100)}</p>
			</div>
		);
	}

  return (
    <div className='flex justify-between bg-white pr-2 font-normal p-2 rounded-xl border px-4'>
      <div className='font-medium capitalize'>
        {field.name}
      </div>
      <div className='flex gap-2 items-center'>
        {
          String(getValue(index,document))
        }
         {" "}
         <div className='text-sm text-gray-950/50'>
          {
            field?.prefix
          }
         </div>
      </div>
    </div>
  )



}

export default ViewField