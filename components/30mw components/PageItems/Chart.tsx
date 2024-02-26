"use client"
import { Timestamp } from "firebase/firestore/lite";
// import ResizableBox from "../ResizableBox";
import useDemoConfig from "./useDemoConfig"
import React, { useEffect, useState } from "react";
import { AxisOptions, Chart } from "react-charts";


 type MyDatum = { date: Date, docs: number }
 
export default function Bar({docs}:any) {

  const [data,setData] = useState<{label:string,data:MyDatum[]}[]>([
    {
     label: 'products',
     data : [{
       date: new Date(),
       docs: 0,
     }],
    }
  ])

  useEffect(()=>{
    const dailyCounts: { [key: string]: number }= {};
    // Assuming 'docs' is an array of documents with '_30mw_createdAt' as a Firebase Timestamp field
    docs.sort( (a:any,b:any) => (a._30mw_createdAt?.seconds ?? 0) - (b._30mw_createdAt?.seconds ?? 0)).forEach((doc:any) => {
      const dateKey = new Date((doc._30mw_createdAt?.seconds ?? 0) * 1000).toISOString().split('T')[0];
      dailyCounts[dateKey] = (dailyCounts[dateKey ]  || 0) + 1 ;
    });
    console.log(dailyCounts)
    // Update the data object with the daily document counts

    const newData:any[] = []
    Object.keys(dailyCounts).forEach((dateKey) => {
      newData.push({
        date: new Date(dateKey),
        docs: dailyCounts[dateKey],
      });
    });

    console.log(newData)
    setData([
      {
       label: 'products',
       data: newData,
     },
   ] as any)

  //   console.log([
  //     {
  //      label: 'products',
  //      data: newData,
  //    },
  //  ])
  },[docs])

 
   const primaryAxis = React.useMemo(
     (): AxisOptions<MyDatum> => ({
       getValue: datum => datum.date,
     }),
     []
   )
 
   const secondaryAxes = React.useMemo(
     (): AxisOptions<MyDatum>[] => [
       {
         getValue: datum => datum.docs,
       },
     ],
     []
   )

  return (
    data &&
    <>
      {/* <ResizableBox> */}
        <Chart
           className="flex-1"
           options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
        />
      {/* </ResizableBox> */}
    </>
  );
}
