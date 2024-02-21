import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, useDisclosure} from "@nextui-org/react";
import { Copy, Edit, Menu, MoreHorizontal, Trash } from "lucide-react";
import React from 'react'
import EditModal from "./Edit";
import { CollectionType } from "@/types/collection";

type Props = {
  document: any,
  setDocument: Function
  collection: CollectionType
}

function Controllers({
  document:_document,
  setDocument,
  collection
}: Props) {
  const iconClasses = "text-xl w-5 h-5 mr-2 text-default-500 pointer-events-none flex-shrink-0";
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <EditModal document={_document} setDocument={setDocument} collection={collection} model={{isOpen, onOpen, onOpenChange}} />
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="ghost" 
          isIconOnly

        >
          <MoreHorizontal size={16} className={cn(iconClasses,"mx-2")}/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="edit"
          showDivider
          onClick={onOpen}
          description="Allows you to edit the file"
          startContent={<Edit className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="copy"
          description="Copy the file link"
          startContent={<Copy className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          startContent={<Trash className={cn(iconClasses)} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </>
  )
}

export default Controllers