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
} from "@nextui-org/react";

type Props = {
	index: number[];
	setCollection: Function;
	collection : CollectionType
};

import {
	ArrowRight,
	Brackets,
	Calendar,
	CircleUser,
	ClockIcon,
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

const FieldsTypes = [
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
	{ name: "text", icon: (p: any) => <Text {...p} />, description: "Long text" },
	{
		name: "image",
		icon: (p: any) => <ImageIcon {...p} />,
		description: "Image",
	},
	{
		name: "reference",
		icon: (p: any) => <MousePointer {...p} />,
		description: "Reference",
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
	{ name: "date", icon: (p: any) => <Calendar {...p} />, description: "Date" },
	{
		name: "boolean",
		icon: (p: any) => <ToggleLeft {...p} />,
		description: "True or False",
	},
	{
		name: "object",
		icon: (p: any) => <Group {...p} />,
		description: "Group of fields",
	},
	{
		name: "avatar",
		icon: (p: any) => <CircleUser {...p} />,
		description: "Profile picture",
	},
	{ name: "time", icon: (p: any) => <ClockIcon {...p} />, description: "Time" },
];

function EditDailog({ setCollection, index , collection }: Props) {
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
			<Button onPress={onOpen} size="sm" isIconOnly className="mt-1 ml-1" variant="light">
				<MoreHorizontal size={15}/>
			</Button>
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
											<SelectItem key={field.name} value={field.name}>
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

export default EditDailog;
