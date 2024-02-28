"use client";
import SideNavbar from "@/components/30mw components/SideNavbar";
import DashboardProvider from "@/components/30mw components/providers/DashboardProvider";
import { db } from "@/firebase";
import { cn } from "@/lib/utils";
import { AdminType, useAdminStore } from "@/store/30mw/admin";
import useCollections from "@/store/30mw/collections";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
	Button,
	Avatar,
  AvatarGroup,
} from "@nextui-org/react";
import { and, collection, getDocs, query, where } from "firebase/firestore";
import { ArrowRight } from "lucide-react";

import React, { useEffect, useMemo, useState } from "react";

type Props = {};

function page({}: Props) {
	return (
		<DashboardProvider>
			<div className="flex gap-8 w-full flex-1">
				<SideNavbar />
				<div className="min-h-[110vh] pt-8 flex-1 p-4">
					<h1 className="text-5xl my-2">🚀 Dashboard</h1>
					<h1 className="text-3xl"> welcome tchisama 👋</h1>
					<div className="mt-12 grid grid-cols-4 ml-auto gap-4">
            <CollectionsCard />
						<NotificationsCard />
						<FileCard />
						<DashboardCard />
						<UsersCard />
						<TrashCard />
					</div>
				</div>
			</div>
		</DashboardProvider>
	);
}


const TrashCard = ()=>{
  const {collections} = useCollections()
  return (
          <Link  className=" " href="/dashboard/settings/collections">
						<Card className="w-full h-full">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-2xl">🗑️ Trash</p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2 items-end">
								<div className="flex gap-4 items-center">

									<div className="flex gap-2 flex-col">
										<p className="">{collections.length} deleted items</p>
									</div>
								</div>
							</CardBody>
						</Card>
					</Link>
  )
}
const DashboardCard = ()=>{
  const {collections} = useCollections()
  return (
          <Link  className=" " href="/dashboard/settings/collections">
						<Card className="w-full h-full ">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-2xl">⚙️ Dashboard</p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2 items-end">
								<div className="flex gap-4 items-center">

									<div className="flex gap-2 flex-col">
										<p className="">{collections.length} deleted items</p>
									</div>
								</div>
							</CardBody>
						</Card>
					</Link>
  )
}

const FileCard = ()=>{
  const [files,setFiles]=useState<any[]>([])
	useEffect(()=>{
		getDocs(query(collection(db, "_30mw_filesystem"), and( where("_30mw_deleted", "==", false) , where("type", "==", "file") ) )).then(_=>{
			setFiles(_?.docs?.map(_=>_.data()) as any[])
			console.log(_?.docs?.map(_=>_.data()))
		})
	},[])
  return (
          <Link  className=" " href="/dashboard/settings/filesystem/home">
						<Card className="w-full h-full">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-2xl">📂 File System</p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2 overflow-hidden">
								<div className="flex   items-end gap-14 ">
									<div className="relative h-20 w-[100px] ">
										{
											files.slice(0,4).reverse().map((file,i)=>{
												return (
													<Image
														key={file.name}
														src={file.url}
														alt="File"
														width={80}
														className={cn("absolute w-[80px] h-[80px] object-contain  top-0 bg-slate-50 p-1 drop-shadow-md rounded-xl border left-0", ["-rotate-3 left-0","rotate-0 left-5","rotate-3 left-10","rotate-6 left-16"][i])}
														height={80}
													/>
												)
											})
										}

									</div>
									<div className="flex gap-2 flex-col">
										<p className="">{files.length} files </p>
									</div>
								</div>
							</CardBody>
						</Card>
						</Link>
  )
}


const UsersCard = ()=>{
	// cont {} = useAdminStore()
	const [admins,setAdmins]=useState<AdminType[]>([])
	useEffect(()=>{
		getDocs(query(collection(db, "_30mw_admins"), and( where("_30mw_deleted", "==", false) , where("accepted", "==", true) ) )).then(_=>{
			setAdmins(_?.docs?.map(_=>_.data()) as any[])
			console.log(_?.docs?.map(_=>_.data()))
		})
	},[])
  return (
          <Link  className=" " href="/dashboard/_30mw_admins">
						<Card className="w-full h-full ">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-2xl">🔐 Admins Manager </p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2 ">
									    <AvatarGroup isBordered className="w-fit">
											{admins.map(_=>(
												<Avatar
													key={_.email}
													name={_.fullName}
													src={_.photo}
												/>
											))}
									    </AvatarGroup>
							</CardBody>
						</Card>
					</Link>
  )
}

const NotificationsCard = ()=>{
  const {collections} = useCollections()
  return (
          <Link  className=" " href="/dashboard/settings/collections">
						<Card className="w-full h-full ">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-2xl">🔔 Notifications </p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2  items-end">
								<div className="flex gap-4 items-center">
									<div className="flex gap-2 flex-col">
										<p className="">{collections.length} deleted items</p>
									</div>
								</div>
							</CardBody>
						</Card>
						</Link>
  )
}



const CollectionsCard = ()=>{
  const {collections} = useCollections()
	const colls= useMemo(()=>{
		return collections.filter((c)=>!c.for_30mw)
	},[collections])
  return (
                  <Link  className=" col-span-2 row-span-2" href="/dashboard/settings/collections">
						<Card className="w-full h-full ">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-2xl">🗃️ Collections Manager</p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2 justify-end">
								<div className="flex gap-4 items-center h-fit">
									<div className="text-8xl font-light">{colls.length}</div>
									<Divider className="h-14" orientation="vertical" />
									<div className="flex gap-2 flex-col">
										<p className="">you have now {colls.length} collections</p>
                    <Divider />
										<div className=" gap-1">
                      {
                        colls.map((_,i)=>{
                          return <div key={i} className="text-xl mx-1 my-1 inline-block  p-1 bg-slate-100 border rounded-xl">{_.icon}</div>
                        })
                      }
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
                  </Link>
  )
}

export default page;
