import DropZoneComponent from "@/components/DropZoneCompnent";
import { FilesTable } from "@/components/FilesTable";
import { currentUser } from "@clerk/nextjs";
import React from "react";

async function page() {
  const user = await currentUser();
  return (
    <div>
      <DropZoneComponent
        firstName={user!.firstName}
        lastName={user!.lastName}
        email={user!.emailAddresses[0].emailAddress}
      ></DropZoneComponent>
      <div className="px-5 py-10">
        <FilesTable email={user?.emailAddresses[0].emailAddress!}></FilesTable>
      </div>
    </div>
  );
}

export default page;
