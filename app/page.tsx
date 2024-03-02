"use client";
import Doc from "@/components/30mw components/DocComponents/Doc";
import CollectionPage from "@/components/30mw components/PageItems/CollectionPage";
import {getValue , returnUpdated, createEmptyObject } from "@/lib/utils/index";
import { CollectionType, Field } from "@/types/collection";
import { produce } from "immer";
import React, { useEffect } from "react";

import { Timestamp } from "firebase/firestore/lite";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import { Card } from "@nextui-org/react";



// 😎 copy and paste type to your code 

type CoursesType = {
	title : string;
	image : string;
	description : string;
	price : number;
	id: string;
	autor : {
		age : number;
		name : string;
		skills : {
			name : string;
			level : "level 1 😗" | "level 2 😎" | "level 3 🤯";
		}[];
	};
	_30mw_deleted : boolean;
	_30mw_createdAt : Timestamp;
	_30mw_updatedAt : Timestamp;
}



const Home = () => {

	const [courses, setCourses] = React.useState<CoursesType[]>()



	useEffect(() => {
		getDocs(query(collection(db, "courses"))).then((docs) => {
			setCourses(
				docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as CoursesType[]
			)
		})
	},[])
	return (
    <div className="">
			{/* <CollectionPage readOnly /> */}
			{
				courses?.map((c) => {
					return (
						<Card key={c.id}>
							<Image src={c.image} width={200} height={200} alt=""/>
							<p>{c.title}</p>
						</Card>
					)
				})
			}
    </div>
	);
};












export default Home;
