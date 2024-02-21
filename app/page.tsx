"use client";
import Doc from "@/components/DocComponents/Doc";
import CollectionPage from "@/components/PageItems/CollectionPage";
import {getValue , returnUpdated, createEmptyObject } from "@/lib/utils/index";
import { CollectionType, Field, UserCollection, me as _me } from "@/types/collection";
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
