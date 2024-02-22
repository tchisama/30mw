import { Field } from "@/types/collection";
import { produce } from "immer";

export const getValue = (
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

export const returnUpdated = (index: (string | number)[], obj: any, newValue: any) => {
    const newObj = produce(obj, (draft: any) => {
        let target = draft;
        for (let i = 0; i < index.length - 1; i++) {
            if(target[index[i]]===undefined) {
                target[index[i]] = {}
            }
            target = target[index[i]];
        }
        target[index[index.length - 1]] = newValue;
    });
    return newObj;
};
// delete item form the array 

export const returnDeleted = (index: (string | number)[], obj: any) => {
    const newObj = produce(obj, (draft: any) => {
        let target = draft;
        for (let i = 0; i < index.length - 1; i++) {
            if(target[index[i]]===undefined) {
                return
            }
            target = target[index[i]];
        }
        delete target[index[index.length - 1]];
    });
    return newObj;
};

export function createEmptyObject(collection: Field[]) {
  const emptyObject:any = {};

  if(!collection) return emptyObject
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




