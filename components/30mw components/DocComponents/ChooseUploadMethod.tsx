import React from 'react'
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ChevronDown } from 'lucide-react';
import UploadImage from './UploadImage';
type Props = {
  returnedImage: (url: string) => void;
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

  return (
    <>
      <ButtonGroup variant="flat">

        <Button size='lg' color='primary' variant='solid'>{labelsMap[selectedOptionValue as keyof typeof labelsMap]}</Button>

        <Dropdown size='lg' placement="bottom-end">
          <DropdownTrigger >
            <Button size='lg' color='primary' variant="solid" isIconOnly>
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
    </>
  )
}

export default ChooseUploadMethod