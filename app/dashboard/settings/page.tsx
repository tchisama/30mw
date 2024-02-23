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

import React from "react";

type Props = {};

function page({}: Props) {
	return (
		<DashboardProvider>
			<div className="flex gap-8 w-full flex-1">
				<SideNavbar />
				<div className="min-h-[110vh] flex-1 p-4">
					<div className="mt-12 grid grid-cols-3 gap-4">
            <CollectionsCard />
						<FileCard />
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
						<Card className="max-w-[500px] h-fit">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-xl">🗑️ Trash</p>
                  <Link href="/dashboard/settings/collections">
                    <Button variant="faded" color="primary">
                      Open <ArrowRight size={16} />
                    </Button>
                  </Link>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2">
								<div className="flex gap-4 items-center">

									<div className="flex gap-2 flex-col">
										<p className="text-sm">{collections.length} deleted items</p>
									</div>
								</div>
							</CardBody>
						</Card>
  )
}

const FileCard = ()=>{
  const {collections} = useCollections()
  return (
						<Card className="max-w-[500px] h-fit">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-xl">📂 File Manager</p>
                  <Link href="/dashboard/settings/collections">
                    <Button variant="faded"  color="primary">
                      Open <ArrowRight size={16} />
                    </Button>
                  </Link>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2">
								<div className="flex gap-4 items-center">
									<div className="flex gap-2 flex-col">
										<p className="text-sm">{collections.length} deleted items</p>
									</div>
								</div>
							</CardBody>
						</Card>
  )
}

const CollectionsCard = ()=>{
  const {collections} = useCollections()
  return (
						<Card className="max-w-[500px]">
							<CardHeader className="flex gap-3">
								<div className="flex justify-between w-full">
									<p className="text-xl">🗃️ Collections Manager</p>
                  <Link href="/dashboard/settings/collections">
                    <Button variant="faded"  color="primary">
                      Open <ArrowRight size={16} />
                    </Button>
                  </Link>
								</div>
							</CardHeader>
							<Divider />
							<CardBody className="flex gap-2">
								<div className="flex gap-4 items-center">
									<div className="text-6xl">{collections.length}</div>
									<Divider className="h-14" orientation="vertical" />
									<div className="flex gap-2 flex-col">
										<p className="text-sm">you have now {collections.length} collections</p>
                    <Divider />
										<div className="flex gap-1">
                      {
                        collections.map((_,i)=>{
                          return <div key={i} className="text-xl p-1 bg-slate-100 border rounded-xl">{_.icon}</div>
                        })
                      }
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
  )
}

export default page;
