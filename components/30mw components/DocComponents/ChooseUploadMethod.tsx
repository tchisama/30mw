import React from 'react'
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from "@nextui-org/react";
import { ChevronDown } from 'lucide-react';
import UploadImage from './UploadImage';
import FilesystemExplorer from '../filesystemExplorer';
type Props = {
  returnedImage: (url: string) => void;
  defaultFolder?:boolean
  folder: string
}

const ChooseUploadMethod = (props: Props) => {
  const [selectedOption, setSelectedOption] = React.useState(new Set(["upload"]));

  const descriptionsMap = {
    upload: "Initiate file upload from your local device",
    filesystem: "Access files from your online filesystem",
  };

  const labelsMap = {
    upload: "📤 Upload image",
    filesystem: "📁 Filesystem",
  };
  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <UploadImage folder={props.folder} returnImage={props.returnedImage} defaultFolder={props.defaultFolder} >
      
      {
        ({id})=>{
          return(
                <ButtonGroup variant="flat">

                  <Button onPress={
                    ()=>{
                      if(selectedOptionValue === "upload"){
                        document.getElementById(id)?.click()
                      }else{
                        onOpen()
                      }
                    }
                  }  color='primary' variant='solid'>{labelsMap[selectedOptionValue as keyof typeof labelsMap]}</Button>

                  <Dropdown placement="bottom-end">
                    <DropdownTrigger >
                      <Button  color='primary' variant="solid" isIconOnly>
                        <ChevronDown />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      disallowEmptySelection
                      aria-label="upload options"
                      selectedKeys={selectedOption}
                      selectionMode="single"
                      onSelectionChange={setSelectedOption as any}
                      className="max-w-[300px]"
                    >
                      <DropdownItem key="upload" description={descriptionsMap["upload"]}>
                        {labelsMap["upload"]}
                      </DropdownItem>
                      <DropdownItem key="filesystem" description={descriptionsMap["filesystem"]}>
                        {labelsMap["filesystem"]}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                </ButtonGroup>
            )
        }
      }
      </UploadImage>
      <FilesystemExplorer model={{isOpen,onOpen,onOpenChange}} retrunImage={props.returnedImage}  />
    </>
  )
}

export default ChooseUploadMethod