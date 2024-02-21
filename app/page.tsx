"use client";

import { CollectionType, Field, UserCollection, me as _me } from "@/types/collection";
import { produce } from "immer";
import React from "react";

const Home = () => {
  const [me, setMe] = React.useState<any>(_me);
	return (
		<div>
			{UserCollection.structure.map((field: Field, index) => {
				return (
					<div className="container" key={field.name}>
						{RenderField(field, [field.name], me,setMe)}
					</div>
				);
			})}
		</div>
	);
};

const RenderField = (field: Field, index: (string | number)[], me: any, setMe: Function) => {
	if (field.type === "object") {
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
		return (
			<div className="">
				{field.name}
				<div className="border-l pl-6">
					{(getValue(index, me) as any[])?.map(
						(value, index2) => {
							return (
								<div key={index2}>
									{field.structure.map((field: Field, index3) => {
										return RenderField(
											field,
											[...index, index2, field.name],
											me,
                      setMe
										);
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

const getValue = (
	index: (string | number)[],
	obj: any
) => {
	let v = obj;
	for (let i = 0; i < index.length; i++) {
		v = v[index[i]];
	}
	return v;
};

const returnUpdated = (index: (string | number)[], obj: any, newValue: any) => {
    const newObj = produce(obj, (draft: any) => {
        let target = draft;
        for (let i = 0; i < index.length - 1; i++) {
            target = target[index[i]];
        }
        target[index[index.length - 1]] = newValue;
    });
    return newObj;
};


export default Home;
