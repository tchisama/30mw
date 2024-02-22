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

    if (currentItem.type === "object" && currentItem.object && currentItem.object.length > 0) {
        // If the current item is an object, go one level deeper
        const updatedObject = setSelect({ rows: currentItem.object, index: index.slice(1), newValue });
        currentItem.object = updatedObject;
    } else if (currentItem.type === "array") {
        // If the current item is an array, go one level deeper
        const updatedObject = setSelect({ rows: currentItem.array, index: index.slice(1), newValue });
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

    if (newRows[index[0]].type === "object") {
        if (!newRows[index[0]].structure) {
            newRows[index[0]].structure = [];
        }
        newRows[index[0]].structure =  addRow({ rows: newRows[index[0]].object, index: index.slice(1), newValue })

    } else if (newRows[index[0]].type === "array") {
        if (!newRows[index[0]].structure) {
            newRows[index[0]].structure = [];
        }
        newRows[index[0]].structure = addRow({ rows: newRows[index[0]].array, index: index.slice(1), newValue });

    } else {
        newRows[index[0]] = newValue;
    }

    // return [...newRows, newValue];
    return newRows;
};
