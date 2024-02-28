"use client";
import SideNavbar from "@/components/30mw components/SideNavbar";
import DashboardProvider from "@/components/30mw components/providers/DashboardProvider";
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
import { ArrowRight } from "lucide-react";

import React, { useMemo } from "react";

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
  const {collections} = useCollections()
  return (
          <Link  className=" " href="/dashboard/settings/filesystem/root">
						<Card className="w-full h-full">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-2xl">📂 File System</p>
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


const UsersCard = ()=>{
	  const {collections} = useCollections()
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
								<div className="flex gap-4 items-center">
									<div className="flex gap-2 items-end">
										<p className="text-3xl">{collections.length} </p>
										<p className="text-lg"> users</p>
									</div>
								</div>
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
