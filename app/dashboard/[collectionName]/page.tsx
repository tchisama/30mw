"use client"
import CollectionPage from "@/components/30mw components/PageItems/CollectionPage";
import SideNavbar from "@/components/30mw components/SideNavbar";
import DashboardProvider from "@/components/30mw components/providers/DashboardProvider";
import useCollections from "@/store/30mw/collections";
import React, { useEffect } from "react";

const Home = () => {
  const { collections, selectedCollection } = useCollections();
	return (
    <DashboardProvider>
      {
        collections.length > 0 && selectedCollection &&
        <div className="flex gap-8">
          <SideNavbar />
          <div className="min-h-[110vh] flex flex-1">

            <CollectionPage />
          </div>
        </div>
      }
    </DashboardProvider>
	);
};












export default Home;
