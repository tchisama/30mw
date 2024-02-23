import { Field } from "@/types/collection";

export const setSelect = ({ rows, index, newValue }: { rows: any[]; index: number[]; newValue: any }): any[] => {

    const newRows = [...rows]; // Create a shallow copy of the original rows array

    let currentItem = newRows[index[0]]

    if (!currentItem || index.length === 0) {
        return newRows; // Return the original rows array if index is out of bounds or invalid input
    }

    if (index.length === 1) {
        // If the index points to the desired value directly
        currentItem.options = newValue;
        return newRows;
    }

    if (currentItem.type === "object" && currentItem.structure && currentItem.structure.length > 0) {
        // If the current item is an object, go one level deeper
        const updatedObject = setSelect({ rows: currentItem.structure, index: index.slice(1), newValue });
        currentItem.structure = updatedObject;
    } else if (currentItem.type === "array") {
        // If the current item is an array, go one level deeper
        const updatedObject = setSelect({ rows: currentItem.structure, index: index.slice(1), newValue });
        currentItem.structure = updatedObject;
    } else {
        // This case is when we have reached the target value
        currentItem.options = newValue;
    }

    return newRows;
}






export const addRow = ({ rows, index, newValue }: { rows: any[]; index: number[]; newValue: any }): any[] => {
    // Make a shallow copy of the rows array
    const newRows = [...rows];

    if (index.length === 0) {
        const res = [...newRows];
        // i want to filter with the name
        return [...res.filter((item) => item.name !== newValue.name), newValue];
        // return [...newRows, {name:"hell",type:"string"}];
    }

    if (newRows[index[0]].type === "object" || newRows[index[0]].type === "array") {
        if (!newRows[index[0]].structure) {
            newRows[index[0]].structure = [];
        }
        newRows[index[0]].structure =  addRow({ rows: newRows[index[0]].structure, index: index.slice(1), newValue })
    } else {
        newRows[index[0]] = newValue;
    }

    // return [...newRows, newValue];
    return newRows;
};





export const setRow = ({ rows, index, newRow }: { rows: any[]; index: number[]; newRow: Field }): any[] => {
    // Make a shallow copy of the rows array
    const newRows = [...rows];

    if (index.length === 0) {
        // If index is empty, return the original rows array
        return newRows;
    }

    const currentItem = newRows[index[0]];

    if (!currentItem || !currentItem.structure || index.length === 1) {
        // If the currentItem is not found or it's the target value directly, update it
        newRows[index[0]] = newRow;
    } else {
        // If the currentItem is an object or array, go one level deeper
        newRows[index[0]].structure = setRow({ rows: currentItem.structure, index: index.slice(1), newRow });
    }

    return newRows;
};



export const deleteRow = ({ rows, index }: { rows: any[]; index: number[] }): any[] => {
    // Make a shallow copy of the rows array
    const newRows = [...rows];

    if (index.length === 0) {
        // If index is empty, return the original rows array
        return newRows;
    }

    const currentItem = newRows[index[0]];

    if (!currentItem || !currentItem.structure || index.length === 1) {
        // If the currentItem is not found or it's the target value directly, remove it
        newRows.splice(index[0], 1);
    } else {
        // If the currentItem is an object or array, go one level deeper
        newRows[index[0]].structure = deleteRow({ rows: currentItem.structure, index: index.slice(1) });
    }

    return newRows;
};
