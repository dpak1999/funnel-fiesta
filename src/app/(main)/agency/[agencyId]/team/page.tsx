import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { FC } from "react";
import DataTable from "./data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";

interface TeamPageProps {
  params: { agencyId: string };
}

const TeamPage: FC<TeamPageProps> = async ({ params }) => {
  const authUser = await currentUser();

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!authUser) return null;
  if (!agencyDetails) return;

  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });

  return (
    <DataTable
      data={teamMembers}
      filterValue="name"
      columns={columns}
      modalChildren={<>Send invitation</>}
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
    />
  );
};

export default TeamPage;
