import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CollectionType } from '@/types/collection'
import { getValueFromIndexes } from '@/lib/utils/index'
import { Button, ButtonGroup, Card, Divider, Tooltip } from '@nextui-org/react'
import useCollections from '@/store/30mw/collections'
import useRunAction from '@/lib/hooks/action'
import { Action } from '@/store/30mw/actions'
import Controllers from '../DocComponents/Controllers'

type Props = {
  collection:CollectionType
  docs: any[]
  actions: Action[]
}

function CollTable({collection,docs,actions}: Props) {
  return (
    <Card className='mt-4'>
   <Table>
  <TableHeader>
    <TableRow>
{
  collection.table &&
  collection.tableRows.map((field)=>(
    <TableHead key={field.title} className='capitalize'>{field.title}</TableHead>
  ))
}
    <TableHead className='text-right' >Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      docs.map((doc)=>{
        return (
          <Row key={doc.id} {...{doc,collection,actions}}/>
        )
      })
    }
  </TableBody>
</Table>
  </Card>
  )
}



const Row = ({doc,collection,actions}:{doc:any,collection:CollectionType,actions:Action[]}) => {
  const [document, setDocument] = React.useState<any>(doc);
  const {selectedCollection} = useCollections()
  const fire = useRunAction()
  return (
     <TableRow key={doc.id}>
          {
            collection.table &&
            collection.tableRows.map((field)=>{
              return <TableCell key={field.title}>{
              // "hello"
              getValueFromIndexes(doc,field.indexes as string[]) ?? "Not Set"
              }</TableCell>
            })
          }
          <TableCell className='flex justify-end '>
                   {
          actions &&
          <ButtonGroup className=' ml-auto flex rounded-xl w-fit justify-end '>
            {
              actions.map((act)=>{
                return(
                  <Tooltip key={act.id} content={act.name}>
                  <Button onClick={()=>fire(act,document,setDocument)} variant='bordered' key={act.id} className='capitalize text-xl' isIconOnly>{fire(act,document,setDocument,"icon") ??act.icon}</Button>
                  </Tooltip>
                )
              })
            }
          </ButtonGroup>
        }
                  <Divider orientation='vertical' className='mr-2 ml-1 h-10' />
        {
        !document._30mw_deleted &&
        <Controllers document={document} setDocument={setDocument} collection={collection}/>
        }
          </TableCell>
    </TableRow>
  )
}

export default CollTable