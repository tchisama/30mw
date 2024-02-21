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
  // if(getValue(index,me)===undefined){
  //   return (
  //     <div className="flex justify-between">
  //       {field.name}
  //       <span>null</span>
  //     </div>
  //   )
  // }
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













const getValue = (
	index: (string | number)[],
	obj: any
) => {
	let v = obj;
	for (let i = 0; i < index.length; i++) {
    if(v[index[i]]===undefined) return null
		v = v[index[i]];
	}
	return v??null;
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


function createEmptyObject(collection: Field[]) {
  const emptyObject:any = {};

  
  collection.forEach(field => {
    if (field.type === "object") {
      emptyObject[field.name] = createEmptyObject(field.structure);
    } else if (field.type === "array") {
      emptyObject[field.name] = [];
    } else {
      emptyObject[field.name] = null;
    }
  });

  return emptyObject;
}






export default Home;
