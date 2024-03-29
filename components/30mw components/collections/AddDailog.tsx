import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Button,
	Input,
	Select,
	SelectItem,
	Tooltip,
} from "@nextui-org/react";

type Props = {
	index: number[];
	setCollection: Function;
};

import {
	ArrowRight,
	Brackets,
	Calendar,
	CircleUser,
	ClockIcon,
	FileType,
	Group,
	Hash,
	ImageIcon,
	ListIcon,
	MoreHorizontal,
	MousePointer,
	PenLine,
	Plus,
	Replace,
	Text,
	ToggleLeft,
	Trash,
	TypeIcon,
} from "lucide-react";
import useCollections from "@/store/30mw/collections";
import { CollectionType } from "@/types/collection";
import { addRow } from "@/lib/utils/collectionsManager";

export const FieldsTypes = [
	{
		name: "string",
		icon: (p: any) => <TypeIcon {...p} />,
		description: "Text data",
	},
	{
		name: "number",
		icon: (p: any) => <Hash {...p} />,
		description: "Numeric data",
	},
	{
		name: "boolean",
		icon: (p: any) => <ToggleLeft {...p} />,
		description: "True or False",
	},
	{
		name: "image",
		icon: (p: any) => <ImageIcon {...p} />,
		description: "Image",
	},
	{
		name: "avatar",
		icon: (p: any) => <CircleUser {...p} />,
		description: "Profile picture",
	},
	{
		name: "object",
		icon: (p: any) => <Group {...p} />,
		description: "Group of fields",
	},
	{
		name: "select",
		icon: (p: any) => <ListIcon {...p} />,
		description: "Selection",
	},
	{
		name: "array",
		icon: (p: any) => <Brackets {...p} />,
		description: "Array",
	},
	{
		name: "reference",
		icon: (p: any) => <MousePointer {...p} />,
		description: "Reference",
	},
	{ name: "date", icon: (p: any) => <Calendar {...p} />, description: "Date" },
	{ name: "time", icon: (p: any) => <ClockIcon {...p} />, description: "Time" },
	{ name: "text", icon: (p: any) => <Text {...p} />, description: "Long text" },
	{ name: "richText", icon: (p: any) => <FileType {...p} />, description: "Rich text" },
];

function AddDailog({ setCollection, index }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [name, setName] = useState("");
	const [type, setType] = useState(new Set([]));

	const [refCollection, setRefCollection] = useState<string>("");
	const [refKey, setRefKey] = useState<string>("");

	const { collections } = useCollections();

	const addRowFunction = () => {
		// return 
		if (!name || !type) return;
		// if (type === "reference") {
		// 	if (!refCollection || !refKey) return;
		// }
		setCollection((prev: CollectionType) => {
			return {
				...prev,
				structure: addRow({
					rows: prev.structure,
					index:index,
					newValue: {
						name,
						type:(type as any).currentKey
					},

				}),
			};
		});

		setName("");
		setType(new Set());

		
	};

	return (
		<>

		<div className="w-full flex justify-end pr-1">
			<Tooltip showArrow={true} content={"add new field"}>
			<Button size="sm" onPress={onOpen} className="mt-2 ml-auto" isIconOnly color="primary">
				<Plus size={16}/>
			</Button>
			</Tooltip>
		</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<div>
							<ModalHeader className="flex flex-col gap-1">
								Add Field 
							</ModalHeader>
							<ModalBody>
								<div className="flex gap-2">
									<Input
										placeholder="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<Select
										selectedKeys={type}
										onSelectionChange={setType as any}
										label="Select an type"
										className="max-w-xs"

									>
										{FieldsTypes.map((field) => (
											<SelectItem className="capitalize" startContent={field.icon({ size: 18 })} key={field.name} value={field.name}>
												{field.name}
											</SelectItem>
										))}
									</Select>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button variant="light" onPress={onClose}>
									Close
								</Button>
								<Button
									color="primary"
									onPress={() => {
										addRowFunction();
										onClose();
									}}
								>
									Create
								</Button>
							</ModalFooter>
						</div>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default AddDailog;

[
	{ name: "image", type: "image" },
	{ name: "userid", type: { anchorKey: "string", currentKey: "string" } },
	{
		name: "in stock",
		type: "boolean",
		labels: { true: "in stock", false: "out of stock" },
	},
];
