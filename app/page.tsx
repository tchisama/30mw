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
const Home = ({test}:{test:any}) => {

	return (
    <div className="">
			hello from the home page
    </div>
	);
};












export default Home;
