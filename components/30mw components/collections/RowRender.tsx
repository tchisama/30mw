import {
	moveRowDown,
	moveRowUp,
	setRow,
	setSelect,
} from "@/lib/utils/collectionsManager";
import { CollectionType, Field } from "@/types/collection";
import { Button, Input } from "@nextui-org/react";
import {
	ArrowRight,
	Brackets,
	Calendar,
	ChevronDown,
	ChevronUp,
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
	X,
} from "lucide-react";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import AddDailog from "./AddDailog";
import EditDailog from "./EditDailog";
import { SettingCollPage } from "./SettingCollPage";
import { getDocs,collection as FireCollection } from "firebase/firestore";
import { db } from "@/firebase";
export type Props = {
	i: number;
	c: CollectionType;
};

const icons = {
	string: (p: any) => <TypeIcon {...p} />,
	number: (p: any) => <Hash {...p} />,
	text: (p: any) => <Text {...p} />,
	image: (p: any) => <ImageIcon {...p} />,
	reference: (p: any) => <MousePointer {...p} />,
	select: (p: any) => <ListIcon {...p} />,
	array: (p: any) => <Brackets {...p} />,
	date: (p: any) => <Calendar {...p} />,
	boolean: (p: any) => <ToggleLeft {...p} />,
	object: (p: any) => <Group {...p} />,
	avatar: (p: any) => <CircleUser {...p} />,
	time: (p: any) => <ClockIcon {...p} />,
};
export const RenderRow = ({
	r,
	collection,
	i: ii,
	setCollection,
}: {
	r: Field;
	collection: CollectionType;
	i: number[];
	setCollection: Function;
}) => {
	const [option, setOption] = useState<string>("");




	const render = (a: Field, index: number[]) => {
		const AddRelativeDiv = (children: React.ReactNode) => {
			return (
				<div className="relative flex group ">
					<div className="flex flex-col items-start justify-start h-fit  mt-2 ">
						<button
							disabled={index[index.length - 1] === 0}
							onClick={() =>
								setCollection({
									...collection,
									structure: moveRowUp({ rows: collection.structure, index }),
								})
							}
							className="flex-1 w-4 hover:bg-slate-200"
						>
							<ChevronUp size={14} />
						</button>
						<button
							onClick={() =>
								setCollection({
									...collection,
									structure: moveRowDown({ rows: collection.structure, index }),
								})
							}
							className="flex-1 w-4 hover:bg-slate-200"
						>
							<ChevronDown size={14} />
						</button>
					</div>
					<div className=" w-full">{children}</div>
					<EditDailog
						value={a}
						r={r}
						setCollection={setCollection}
						index={index}
						collection={collection}
					/>
				</div>
			);
		};
		if (a.type === "object") {
			return AddRelativeDiv(
				<div className="pb-2 bg-white border rounded-xl px-4   my-1 ">
					<div>
						<div className="flex justify-between py-1 border-t ">
							<div className="font-medium">{a.name}</div>
							<div className="flex gap-2 items-center">
								{a.type in icons &&
									icons[a.type as keyof typeof icons]({ size: 15 })}{" "}
								{a.type}
							</div>
						</div>
					</div>
					<div className="px-3 pr-1 bg-slate-400/10 py-2 rounded-xl">
						{a.structure?.map((o, i) => {
							return render(o, [...index, i]);
						})}
						<AddDailog setCollection={setCollection} index={index}></AddDailog>
					</div>
				</div>
			);
		} else if (a.type === "array") {
			return AddRelativeDiv(
				<div className="pb-2  bg-white border rounded-xl px-4  my-1 ">
					<div>
						<div className="flex justify-between py-1 border-t ">
							<div className="font-medium">{a.name}</div>
							<div className="flex gap-2 items-center">
								{a.type in icons &&
									icons[a.type as keyof typeof icons]({ size: 15 })}{" "}
								{a.type}
							</div>
						</div>
					</div>
					<div className="px-3 bg-slate-400/10 py-2 rounded-xl pr-1">
						{a.structure?.map((o, i) => {
							return render(o, [...index, i]);
						})}
						<AddDailog setCollection={setCollection} index={index}></AddDailog>
					</div>
				</div>
			);
		} else if (a.type === "reference") {





			return AddRelativeDiv(
				<div className="flex bg-white border rounded-xl px-4 my-1   border-t py-1 gap-2 justify-between">
					<div className="font-medium">{a.name}</div>
					<div className="flex flex-col items-end">
						<div className="flex gap-2 items-center">
							{a.type in icons &&
								icons[a.type as keyof typeof icons]({ size: 15 })}{" "}
							{a.type}
						</div>
						{a.reference ? (
							<div className="text-sm">
								ref of {a?.reference.key} in {a?.reference.collection}
							</div>
						) : (
							<div className="flex text-sm gap-2 items-center">
								Make a reference <ArrowRight size={18} />
							</div>
						)}
					</div>
				</div>
			);






		} else if (a.type === "select") {
			return AddRelativeDiv(
				<div className="flex flex-col bg-white border rounded-xl px-4 my-1   border-t py-1 gap-2 justify-between">
					<div className="flex justify-between">
						<div className="font-medium">{a.name}</div>
						<div className="flex flex-col items-end">
							<div className="flex gap-2 items-center">{a.type}</div>
						</div>
					</div>
					<div className="p-2 bg-slate-400/10 w-full border rounded-xl flex flex-col gap-2">
						{a.options?.map((o, i) => {
							return (
								<div
									key={i}
									className="flex gap-2 justify-between bg-white rounded-xl p-1 border pl-4 items-center"
								>
									<div className="flex flex-col h-full   ">
										<button
											onClick={() => {
												const newValue = [...a.options];
												if (i > 0 && i < newValue.length) {
													// Ensure i is within bounds
													// Swap positions of items at index i and i-1
													[newValue[i], newValue[i - 1]] = [
														newValue[i - 1],
														newValue[i],
													];
													setCollection({
														...collection,
														structure: setSelect({
															rows: collection.structure,
															index,
															newValue,
														}),
													});
												}
											}}
											className="flex-1 w-4 hover:bg-slate-200"
										>
											<ChevronUp size={14} />
										</button>
										<button
											onClick={() => {
												const newValue = [...a.options];
												if (i < newValue.length - 1) {
													// Ensure i is not the last index
													// Swap positions of items at index i and i+1
													[newValue[i], newValue[i + 1]] = [
														newValue[i + 1],
														newValue[i],
													];
													setCollection({
														...collection,
														structure: setSelect({
															rows: collection.structure,
															index,
															newValue,
														}),
													});
												}
											}}
											className="flex-1 w-4 hover:bg-slate-200"
										>
											<ChevronDown size={14} />
										</button>
									</div>
									<div className="flex-1">
									{o.name}
									</div>
									<Button
										isIconOnly
										onPress={() => {
											console.log(index, collection.structure);
											setCollection({
												...collection,
												structure: setSelect({
													rows: collection.structure,
													index,
													newValue:
														[...a.options.filter((s, ii) => ii !== i)] || [],
												}),
											});
										}}
										className=""
										variant={"ghost"}
									>
										<X size={18} />
									</Button>
								</div>
							);
						})}
					</div>
					<div className="flex h-fit my-2 gap-2 items-center">
						<Input
							placeholder="new option"
							size="sm"
							className=""
							value={option}
							onChange={(e) => setOption(e.target.value)}
						/>
						<Button
							variant="bordered"
							onPress={() => {
								if (!option) return;
								setCollection({
									...collection,
									structured: setSelect({
										rows: collection.structure,
										index,
										newValue: a.options
											? [...a.options, { name: option, value: option }]
											: [{ name: option, value: option }],
									}),
								});
								setOption("");
							}}
							isIconOnly
							className="h-12 w-14"
						>
							<Plus size={18} />
						</Button>
					</div>
				</div>
			);
		} else {
			return AddRelativeDiv(
				<div className="flex border bg-white rounded-xl px-4 my-1 py-1 gap-2 justify-between">
					<div className="font-medium">{a.name}</div>
					<div className="flex gap-2 items-center">
						{a.type in icons &&
							icons[a.type as keyof typeof icons]({ size: 15 })}
						{a.type}
					</div>
				</div>
			);
		}
	};
	return render(r, ii);
};

const RowsTypes = [
	"string",
	"number",
	"boolean",
	"object",
	"array",
	"reference",
	"text",
	"image",
	"avatar",
	"date",
	"time",
	"select",
];

// const EditRow = ({ r,index,setCollection,collection }: { r: Rows,index:number[],setCollection:Function , collection : CollPage}) => {
// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<Button className="" variant="ghost" size={"icon"}>
// 					<MoreHorizontal size={20} />
// 				</Button>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent>
// 				<DropdownMenuLabel>Edit Row</DropdownMenuLabel>
// 				<DropdownMenuSeparator />
//         <DropdownMenuItem className="flex gap-2">
//           <PenLine size={15}/>
//           change name
//         </DropdownMenuItem>
// 				<DropdownMenuGroup>
// 					<DropdownMenuSub>
// 						<DropdownMenuSubTrigger className="flex gap-2"><Replace size={15} />Change Type </DropdownMenuSubTrigger>
// 						<DropdownMenuPortal>
// 							<DropdownMenuSubContent>
//                 {
//                   RowsTypes.map((a, i) => (
//                     <DropdownMenuItem
//                       key={i}
//                       className="flex gap-2"
//                       onClick={()=>{
//                         setCollection(
//                           {
//                             ...collection,
//                             rows:setType({rows:collection.rows,index:[...index],newValue:a})
//                           }
//                         )
//                       }}
//                     >
//                       {icons[a as keyof typeof icons]({ size: 15 })}
//                       {a}
//                     </DropdownMenuItem>
//                   ))
//                 }
// 							</DropdownMenuSubContent>
// 						</DropdownMenuPortal>
// 					</DropdownMenuSub>
// 				</DropdownMenuGroup>
// 				<DropdownMenuItem onClick={
//           ()=>{
//             setCollection(
//               {
//                 ...collection,
//                 rows:removeRow({rows:collection.rows,index})
//               }
//             )
//           }
//         } className="flex gap-2"> <Trash size={15} />Delete</DropdownMenuItem>
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// };

export default SettingCollPage;
