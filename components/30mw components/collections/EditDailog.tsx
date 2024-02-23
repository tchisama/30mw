import React, { useEffect, useState } from "react";
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
	Divider,
} from "@nextui-org/react";

type Props = {
	index: number[];
	setCollection: Function;
	collection: CollectionType;
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
import { CollectionType, Field, FieldTypes } from "@/types/collection";
import { addRow, deleteRow, setRow } from "@/lib/utils/collectionsManager";
import { getValue } from "firebase/remote-config";

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

function EditDailog({
	r,
	index,
	setCollection,
	collection,
	value,
}: {
	r: Field;
	index: number[];
	setCollection: Function;
	collection: CollectionType;
	value: Field;
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [name, setName] = useState(value.name);
	const [type, setType] = useState(new Set(value.type));

	const [refCollection, setRefCollection] = useState<string>("");
	const [refKey, setRefKey] = useState<string>("");

	const [booleanLabels, setBooleanLabels] = useState(value?.labels ?? { true:"", false:"" });

	const [prefix, setPrefix] = useState<string>(value?.prefix);

	const { collections } = useCollections();

	const addRowFunction = () => {
		// return
		if (!name || !type) return;
		// if (type === "reference") {
		// 	if (!refCollection || !refKey) return;
		// }

		setCollection({
			...collection,
			// structure: setType({ r: collection.structure, index: [...index], newValue: type.currentKey })
			structure: setRow({
				rows: collection.structure,
				index: [...index],
				newRow: {
					...r,
					name,
					prefix,
					// if type is boolean i want to add booleanlabels
					labels:booleanLabels,
					type: (type as any).currentKey as FieldTypes ?? value.type,
				} as Field,
			}),
		});

		setName("");
		setType(new Set());
	};
	useEffect(() => {
		setName(value.name);
		setType(new Set([value.type]));
	}, [value]);

	return (
		<>
			<Button
				onPress={onOpen}
				size="sm"
				isIconOnly
				className="mt-1 ml-1"
				variant="light"
			>
				<MoreHorizontal size={15} />
			</Button>
			<Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<div>
							<ModalHeader className="flex flex-col gap-1">
								Edit Field
							</ModalHeader>
							<ModalBody>
								<div className="flex gap-2">
									<Input
										placeholder="Name"
										value={name}
										label="Name"
										onChange={(e) => setName(e.target.value)}
									/>
									<Select
										selectedKeys={type}
										onSelectionChange={setType as any}
										label="Select an type"
										className=""
									>
										{FieldsTypes.map((field) => (
											<SelectItem key={field.name} value={field.name}>
												{field.name}
											</SelectItem>
										))}
									</Select>
								</div>
								{type.has("reference") && <div>hello world</div>}
								{type.has("boolean") && (
									<div className="flex gap-2 ">
										<Input
											// placeholder="true"
											value={booleanLabels.true}
											label="true label"
											onChange={(e) =>
												setBooleanLabels({
													...booleanLabels,
													true: e.target.value,
												})
											}
										/>
										<Input
											// placeholder="false"
											value={booleanLabels.false}
											label="false label"
											onChange={(e) =>
												setBooleanLabels({
													...booleanLabels,
													false: e.target.value,
												})
											}
										/>
									</div>
								)}
								<Input
									label="Prefix"
									className="w-[200px]"
									value={prefix}
									onChange={(e) => setPrefix(e.target.value)}
								/>

								<Divider />
								<div>
									<Button
										onPress={() => {
											setCollection({
												...collection,
												structure: deleteRow({
													rows: collection.structure,
													index: [...index],
												}),
											});
											onClose();
										}}
									>
										{" "}
										<Trash size={16} /> Delete Field
									</Button>
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
									save
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
