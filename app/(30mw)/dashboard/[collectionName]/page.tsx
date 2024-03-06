"use client"
import CollectionPage from "@/components/30mw components/PageItems/CollectionPage";
import SideNavbar from "@/components/30mw components/SideNavbar";
import DashboardProvider from "@/components/30mw components/providers/DashboardProvider";
import { useAdminStore } from "@/store/30mw/admin";
import useCollections from "@/store/30mw/collections";
import React, { useEffect } from "react";

const Home = () => {
  const { collections, selectedCollection } = useCollections();
  const { selectedRule} = useAdminStore()
  const [haveAccess, setHaveAccess] = React.useState(false)
  const [readOnly, setReadOnly] = React.useState(false)
  useEffect(() => {
    if(!selectedRule) return
    const access = ()=>{
        if(selectedRule.name === "developer"){
          setReadOnly(true)
          return true
        }
        if(selectedRule['access to all '] ){
          setReadOnly(!selectedRule["read all only"])
          if(!selectedRule["but collections"]){
            return true
          }else if(!selectedRule["but collections"].find(_=>_['collection name'] === selectedCollection?.name)){
            return true
          }else{
            return false
          }
        }else{
          if(!selectedRule["but collections"]){
            return false
          }else if(!selectedRule["but collections"].find(_=>_['collection name'] === selectedCollection?.name)){
            return false
          }else{
            setReadOnly(selectedRule["but collections"].find(_=>_['collection name'] === selectedCollection?.name)?.["write / update"] ?? false)
            return true
          }
        }
    }
    setHaveAccess(access())
  },[ selectedRule, selectedCollection])
	return (
    haveAccess ?
    <DashboardProvider>
      {
        collections.length > 0 && selectedCollection &&
        <div className="flex gap-8">
          <SideNavbar />
          <div className="min-h-[110vh] flex flex-1">

            <CollectionPage readOnly={readOnly} />
          </div>
        </div>
      }
    </DashboardProvider>
    :
    (
    <DashboardProvider>
      {
        collections.length > 0 && selectedCollection &&
        <div className="flex gap-8">
          <SideNavbar />
          <div className="min-h-[110vh] capitalize gap-4 flex flex-1 justify-center items-center flex-col">
                  <span className="text-6xl">🔐</span>
                  access denied
          </div>
        </div>
      }
    </DashboardProvider>
    )
	);
};












export default Home;
