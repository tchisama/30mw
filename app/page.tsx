"use client";
import Doc from "@/components/DocComponents/Doc";
import {getValue , returnUpdated, createEmptyObject } from "@/lib/utils/index";
import { CollectionType, Field, UserCollection, me as _me } from "@/types/collection";
import { produce } from "immer";
import React from "react";

const Home = () => {
	return (
		// <div>
		// 	{UserCollection.structure.map((field: Field, index) => {
		// 		return (
		// 			<div className="container" key={field.name}>
		// 				{RenderField(field, [field.name], me,setMe)}
		// 			</div>
		// 		);
		// 	})}
		// </div>
    <div className="container">
      <Doc/>
    </div>
	);
};

const RenderField = (field: Field, index: (string | number)[], me: any, setMe: Function) => {

	if (field.type === "object") {
    const value = getValue(index, me)
    if(!value) setMe( returnUpdated(index, me, createEmptyObject(field.structure)))
		return (
			<div className="">
				{field.name}
				<div className="border-l pl-6">
					{field.structure.map((field: Field, index2) => {
						return (
							<div key={field.name} className=" max-w-xl">
								<span>{RenderField(field, [...index, field.name], me,setMe)}</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
	if (field.type === "array") {
    const value = getValue(index, me)?? []
		return (
			<div className="">
        <div className="flex justify-between">
          {field.name}
          <button onClick={()=>{
                setMe(returnUpdated(index, me, [...value,{}]))
            }
            }>add</button>
        </div>
				<div className="border-l bt-1 pl-6">
					{(value as any[])?.map(
						(value, index2) => {
							return (
								<div key={index2 + field.name} className="border my-1 p-2">
									{field.structure.map((field: Field, index3) => {
										return <div key={index3}>{RenderField(
											field,
											[...index, index2, field.name],
											me,
                      setMe
										)}
                    </div>
									})}
								</div>
							);
						}
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className=" max-w-xl flex justify-between">
				<span>{field.name}</span>
				{/* <span>{getValue(UserCollection, index, me)}</span> */}
        <input type="text" onInput={(e: any) => setMe(returnUpdated(index, me, e.target.value))} value={getValue(index, me)} className="border" />
			</div>
		);
	}
};














export default Home;
