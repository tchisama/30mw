import { Timestamp } from "firebase/firestore/lite";

export type Notification = {
	id: string;
	action: string;
	collection: string;
	type: string;
	_30mw_deleted: boolean;
	_30mw_createdAt: Timestamp;
	_30mw_updatedAt: Timestamp;
	maker: {
		id: string;
		fullName: string;
		photo: string;
	};
	seenBy: string[];
	document: string;
	// documentLink:string,
	data: {
		document: any;
		newDocument: any;
	};
};






// 😎 copy and paste type to your code 

type SectionsType = {
	description : number;
	title : string;
	videos : {
		title : string;
		url : string;
	}[];
	_30mw_deleted : boolean;
	_30mw_createdAt : Timestamp;
	_30mw_updatedAt : Timestamp;
}