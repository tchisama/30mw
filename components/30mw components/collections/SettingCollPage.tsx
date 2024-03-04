import { db } from "@/firebase";
import { CollectionType, Field } from "@/types/collection";
import {
	Accordion,
	AccordionItem, Button, Card,
	Input,
	ScrollShadow,
	Switch,
	Tab,
	Tabs,
	avatar,
} from "@nextui-org/react";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddDailog from "./AddDailog";
import EditCollection from "./EditCollection";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { Props, RenderRow } from "./RowRender";
import { Code, Copy } from "lucide-react";
// import { Button } from "@/components/ui/button";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Reorder } from "framer-motion";
import useCollections from "@/store/30mw/collections";


const typeMap = {
	string: "string",
	number: "number",
	boolean: "boolean",
	image: "string",
	reference: "string",
	avatar: "string",
	date: "Timestamp",
	time: "string",
	text: "string",
	richText: "string",
}





export const SettingCollPage = ({ c, i: _i }: Props) => {
	const [collection, setCollection] = useState<CollectionType>(c);
	const [firstRefresh, setFirstRefresh] = useState(false);
	const [typeText, setTypeText] = useState<string>("")
	useEffect(() => {
		// This will prevent the useEffect from running on the initial render
		if (!firstRefresh) {
			setFirstRefresh(true);
			return;
		}

		// Your logic for updating the collection goes here
		// Uncomment the following lines when you want to update the collection in the database
		updateDoc(doc(db, "collections", collection.id), {
			...collection,
			structure: JSON.stringify(collection.structure),
		});
	}, [collection, firstRefresh]);
	const copyType = () => {

		navigator.clipboard.writeText(getTypeString())
	}


	const getTypeString = () => {
		const getType = (structure: Field[], deep: number = 0): string => {
			return `{
${(structure?.map(
				(r) => `${"	".repeat(deep + 1)}${r.name.includes(" ") ? `"${r.name}"` : r.name} : ${r.type == "array" ? `${getType(r.structure, deep + 1)}[]` :
					r.type == "object" ? `${getType(r.structure, deep + 1)}` :
						r.type == "select" ? `${(r?.options?.map((o) => `"${o.value}"`) ?? []).join(" | ")}` : typeMap[r.type as keyof typeof typeMap] ?? "any"
					};`
			) ?? []).join("\n")
				}
${"	".repeat(deep)}}`
		}


		return `
import { Timestamp } from "firebase/firestore/lite";

// 😎 copy and paste type to your code 

type ${collection.name[0].toUpperCase() + collection.name.slice(1)}Type = ${getType(collection.structure.concat([
			{ name: "_30mw_deleted", type: "boolean" },
			{ name: "_30mw_createdAt", type: "date" },
			{ name: "_30mw_updatedAt", type: "date" },
		]))}`

	}

	useEffect(() => {
		setTypeText(getTypeString())
	}, [collection])






	return (
		<Card className="p-4 h-fit">
			<div className="flex gap-6 items-center">
				<div style={{ fontSize: "2rem" }}>{(c as CollectionType).icon}</div>
				<div className="flex flex-col gap-0">
					<h1 className="text-xl capitalize font-medium">{c.name}</h1>
					<h1 className="text-sm font-medium text-primary/60">
						{(c as CollectionType).subtitle}
					</h1>
				</div>
				<div className="ml-auto flex items-center">

					<EditCollection
						collection={collection}
						setCollection={setCollection} />
				</div>
			</div>
			<Accordion defaultExpandedKeys={["1"]}>
				<AccordionItem key="1" aria-label="Setting" title="⚙️ Setting" >
					<Tabs>








						<Tab key={"structure"} title="Structure">

							<ResizablePanelGroup direction="horizontal">
								<ResizablePanel >

									<div className="bg-slate-50 flex flex-col border flex-[2] rounded-xl p-2 ">
										<Reorder.Group values={collection.structure} onReorder={(v) => setCollection({ ...collection, structure: v })}>
											{collection.structure &&
												collection.structure.map((r, i) => {
													return (
														<Reorder.Item key={JSON.stringify(r)} value={r} >
															<RenderRow
																setCollection={setCollection}
																key={i}
																r={r}
																collection={collection}
																i={[i]} />
														</Reorder.Item>
													);
												})}
										</Reorder.Group>
										<AddDailog setCollection={setCollection} index={[]} />
									</div>

								</ResizablePanel>
								<ResizableHandle className="mx-4" withHandle />
								<ResizablePanel >

									<ScrollShadow hideScrollBar className="flex-1 flex flex-col border bg-[#282c34] h-fit text-white font-semibold text-lg p-4 rounded-2xl relative" orientation="horizontal" >
										<Button onClick={copyType} size="sm" isIconOnly variant="light" className="text-white absolute top-2 right-2">
											<Copy size={18} />
										</Button>
										<span className="text-sm font-medium">Collection Type</span>
										<span className="text-xs font-light">Typescript</span>
										<SyntaxHighlighter language="typescript" style={atomOneDark}>
											{typeText}
										</SyntaxHighlighter>
									</ScrollShadow>


								</ResizablePanel>
							</ResizablePanelGroup>

						</Tab>

						<Tab key={"table"} title="Table">
							<TableController {...{ collection, setCollection }} />
						</Tab>



					</Tabs>
				</AccordionItem>
			</Accordion>
		</Card>
	);
};




const TableController = ({ collection, setCollection }: { collection: CollectionType, setCollection: Function }) => {
	return (
		<div>
			<div className="text-lg flex flex-row-reverse gap-2 justify-end mt-4">
				Add Table View <Switch onValueChange={(e) => setCollection({ ...collection, table: e })} isSelected={collection?.table} />
			</div>
			{
				collection?.table &&
				<div>

					<div className="text-lg flex flex-row-reverse gap-2 justify-end mt-2">
						Default View <Switch onValueChange={(e) => setCollection({ ...collection, defaultView: e ? "table" : "grid" })} isSelected={collection?.defaultView == "table"} />
					</div>
					<Button 
					onClick={()=>{
						if(!collection?.tableRows){
							setCollection({ ...collection, tableRows: [{title:"",indexes:[]}] })
						}else{
							setCollection({ ...collection, tableRows: [...collection.tableRows, {title:""}] })
						}
					}}
					 color="primary" className="mt-4"> Add Row To Table</Button>
					<div className="p-4 bg-slate-50 flex flex-col gap-2 rounded-xl border mt-2">
						{
							collection?.table &&
							collection?.tableRows?.map((r, i) => {
								return <div className="bg-white p-2 rounded-xl border flex justify-between" key={i}>
									<Input size="sm" className="max-w-sm" value={r.title} onChange={(e) => {
										setCollection({ ...collection, tableRows: collection.tableRows?.map((r2, i2) => i == i2 ? { ...r2, title: e.target.value } : r2) })
									}} />
									
								</div>
							})
						}
					</div>
				</div>
			}
		</div>
	)
}