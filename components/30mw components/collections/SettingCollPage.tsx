import { db } from "@/firebase";
import { CollectionType } from "@/types/collection";
import {
	Accordion,
	AccordionItem, Card
} from "@nextui-org/react";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddDailog from "./AddDailog";
import EditCollection from "./EditCollection";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { Props, RenderRow } from "./RowRender";

export const SettingCollPage = ({ c, i: _i }: Props) => {
	const [collection, setCollection] = useState<CollectionType>(c);
	const [firstRefresh, setFirstRefresh] = useState(false);

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
				<div className="ml-auto">
					<EditCollection
						collection={collection}
						setCollection={setCollection} />
				</div>
			</div>
			<Accordion>
				<AccordionItem key="1" aria-label="Structure" title="Edit Structure">
					<div className="bg-slate-50 flex flex-col border rounded-xl p-2 ">
						<DndContext collisionDetection={closestCorners}>
							{collection.structure &&
								collection.structure.map((r, i) => {
									return (
										<RenderRow
											setCollection={setCollection}
											key={i}
											r={r}
											collection={collection}
											i={[i]} />
									);
								})}
						</DndContext>
						<AddDailog setCollection={setCollection} index={[]} />
					</div>
				</AccordionItem>
			</Accordion>
		</Card>
	);
};
