"use client";
import Doc from "@/components/30mw components/DocComponents/Doc";
import CollectionPage from "@/components/30mw components/PageItems/CollectionPage";
import {getValue , returnUpdated, createEmptyObject } from "@/lib/utils/index";
import { CollectionType, Field } from "@/types/collection";
import { produce } from "immer";
import React from "react";

const Home = () => {
	return (
    <div className="">
			<CollectionPage />
    </div>
	);
};












export default Home;
