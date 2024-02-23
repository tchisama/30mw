import {
	createEmptyObject,
	getValue,
	returnDeleted,
	returnUpdated,
} from "@/lib/utils/index";
import { Field } from "@/types/collection";
import {
	Avatar,
	Button,
	Chip,
	Image,
	Input,
	Select,
	SelectItem,
	Spinner,
	Switch,
	Textarea,
	Tooltip,
} from "@nextui-org/react";
import {
	Edit,
	MoreHorizontal,
	Plus,
	Settings,
	Trash,
	Upload,
	X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { fileURLToPath } from "url";
import NextImage from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import UploadImage from "./UploadImage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

type Props = {
	field: Field;
	index: (string | number)[];
	document: any;
	setDocument: Function;
};

function EditField({ field, index, document: _document, setDocument }: Props) {







	const [refDocs,setRefDocs] = useState<any[]>([])

	useEffect(()=>{
		if(field.type === "reference"){
				
			getDocs(
				collection(db,field.reference.collection)
			).then((docs)=>{
				setRefDocs(docs.docs.map((d)=>d.data())as any[])
			})
		}
	},[field])


	if (field === null) return null;

	if (field.type === "object") {
		return (
			<div className="p-2 bg-white rounded-xl border ">
				<div className="font-medium mb-2 capitalize">{field.name}</div>
				<div className=" bg-slate-400/5 p-2 border rounded-xl space-y-1">
					{field.structure.map((f: Field, i) => {
						return (
							<EditField
								key={f.name}
								field={f}
								index={[...index, f.name]}
								document={_document}
								setDocument={setDocument}
							/>
						);
					})}
				</div>
			</div>
		);
	}





	if (field.type === "array") {
		const value = getValue(index, _document) ?? [];
		return (
			<div className="p-2 bg-white rounded-xl border  ">
				<div className="flex justify-between">
					<div className="font-medium mb-2 capitalize">{field.name}</div>
					<div>
						<Tooltip showArrow={true} content={`Add to  ${field.name}`}>
							<Button
								onClick={() => {
									setDocument(
										returnUpdated(index, _document, [
											{ id: Date.now(), ...createEmptyObject(field.structure) },
											...value,
										])
									);
								}}
								size="sm"
								className="mb-2"
								color="primary"
								isIconOnly
							>
								<Plus size={16} />
							</Button>
						</Tooltip>
					</div>
				</div>
				<div className=" space-y-1 bg-slate-400/5 p-2 border rounded-xl">
					<Carousel>
						<CarouselContent className="">
							{(value as any[])?.map((value2, index2) => {
								return (
									<CarouselItem key={value2.id}>
										<div
											key={index2 + field.name}
											className="rounded-xl space-y-1 my-1 "
										>
                    <Button
                      // isIconOnly
                      variant="bordered"
                      className="mb-2"
                      onPress={() =>
                        setDocument((p: any) => {
                          return returnUpdated(
                            index,
                            p,
                            getValue(index, p).filter(
                              (v: any, ii: number) => ii !== index2
                            )
                          );
                        })
                      }
                      size="sm"
                    >
                      <Trash size={16} /> Delete item
                    </Button>
											{field.structure.map((field2: Field, index3) => {
												return (
													<div key={index3}>
														<EditField
															key={field.name}
															field={field2}
															index={[...index, index2, field2.name]}
															document={_document}
															setDocument={setDocument}
														/>
													</div>
												);
											})}
										</div>
									</CarouselItem>
								);
							})}
						</CarouselContent>
						<div className="relative  flex items-end justify-between">
							<div className="flex gap-2 pt-4 h-8">
								<CarouselPrevious className="static rounded-xl" />
								<CarouselNext className="static rounded-xl" />
							</div>
						</div>
					</Carousel>
				</div>
			</div>
		);
	}










	if (field.type === "boolean") {
		const value = getValue(index, _document);
		return (
			<div className="flex justify-between bg-white pr-2 p-2 rounded-xl border px-4">
				<div className="font-medium capitalize">{field.name}</div>
				<Switch
					isSelected={value}
					onValueChange={(v) => {
						setDocument((p: any) => {
							return returnUpdated(index, p, v);
						});
					}}
					aria-label="Automatic updates"
				/>
			</div>
		);
	}



















	if (field.type == "select") {
		return (
			<div className="flex justify-between bg-white pr-2 p-2 rounded-xl border px-4">
				<div className="font-medium capitalize">{field.name}</div>
				<Select
					endContent={
						field?.prefix
					}
					selectedKeys={[getValue(index, _document)]}
					onSelectionChange={(v:any) => {
						setDocument((p: any) => {
							console.log(v.currentKey,p)
							return returnUpdated(index, p, v.currentKey);
						});
					}}
					label="Select an animal"
					className="max-w-xs"
				>
					{field.options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.name}
						</SelectItem>
					))}
				</Select>
			</div>
		);
	}










	if (field.type == "text") {
		return (
			<div className="flex justify-between bg-white pr-2 flex-col p-2 rounded-xl border px-4">
				<div className="font-medium capitalize">{field.name}</div>
				<Textarea
					className="mt-2"
					value={getValue(index, _document)}
					onValueChange={(v: string) => {
						setDocument((p: any) => {
							return returnUpdated(index, p, v);
						});
					}}
				></Textarea>
			</div>
		);
	}











	if (field.type === "image") {
		return (
			<div className="p-2 bg-white rounded-xl gap-2 flex justify-between border ">
				<div className="flex flex-col flex-1 p-0">
					<div className="font-medium mb-2 capitalize">{field.name}</div>
					{/* <div>{getValue(index,_document)}</div> */}
					<div className="flex flex-col flex-1 p-2 justify-end items-end gap-2 ">
						<UploadImage
							returnImage={(v) => {
								setDocument((p: any) => {
									return returnUpdated(index, p, v);
								});
							}}
						>
							{({ id, loading }) => {
								return (
									<Button
										onPress={() => {
											document.getElementById(id)?.click();
										}}
										variant="solid"
										color="primary"
									>
										{loading ? (
											<Spinner color="white" size="sm" />
										) : (
											<Upload size={16} />
										)}
										Upload Image
									</Button>
								);
							}}
						</UploadImage>
						<Button
							onPress={() => {
								setDocument((p: any) => {
									return returnUpdated(index, p, null);
								});
							}}
							variant="solid"
						>
							<X size={16} />
							Clear Image
						</Button>
					</div>
				</div>
				<div className=" bg-slate-400/5   p-2 border rounded-xl w-fit flex items-center justify-center space-y-1">
					{
						<Image
							width={200}
							height={200}
							as={NextImage}
							alt="NextUI hero Image"
							src={getValue(index, _document) ?? ""}
							className="h-[200px] object-contain w-[200px] mx-auto"
						/>
					}
				</div>
			</div>
		);
	}















	if (field.type === "avatar") {
		return (
			<div className="p-2 bg-white rounded-xl gap-2 flex justify-between border ">
				<div className="font-medium capitalize">{field.name}</div>
				{/* <div>{getValue(index,_document)}</div> */}
				<UploadImage
					returnImage={(v) => {
						setDocument((p: any) => {
							return returnUpdated(index, p, v);
						});
					}}
				>
					{({ loading }) => {
						return loading ? (
							<div className="flex w-10 h-10 items-center justify-center">
								<Spinner size="sm" />
							</div>
						) : (
							<Avatar
								className="cursor-pointer"
								src={getValue(index, _document)}
							/>
						);
					}}
				</UploadImage>
			</div>
		);
	}




	if(field.type == "reference"){
		return(
			<div className="p-2 bg-white rounded-xl gap-2 flex justify-between border ">
				<div className="font-medium capitalize">{field.name}</div>
				<Select
					// defaultValue={getValue(index,_document) ?? ""}
					value={getValue(index, _document) ?? ""}
					onValueChange={(v) => {
						setDocument((p: any) => {
							return returnUpdated(index, p, v);
						});
					}}
					label="Select an animal"
					className="max-w-xs"
				>
					{refDocs.map((doc) => (
						<SelectItem key={doc.id} value={doc.id}>
							{option.name}
						</SelectItem>
					))}
				</Select>
			</div>
		)
	}










	return (
		<div className="flex justify-between bg-white pr-2 p-2 rounded-xl border px-4">
			<div className="font-medium capitalize">{field.name}</div>
			<div className="flex gap-2 items-center">
				<Input
					endContent={
						field?.prefix
					}
					type={
						field.type === "number"
							? "number"
							: field.type === "string"
							? "text"
							: field.type === "date"
							? "date"
							: field.type === "time"
							? "time"
							: "text"
					}
					size="sm"
					className="w-[300px]"
					value={getValue(index, _document)}
					onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
						setDocument((p: any) => {
							const value = e.target.value;
							return returnUpdated(index, p, value);
						});
					}}
					label={field.type}
				/>
			</div>
		</div>
	);
}

export default EditField;
