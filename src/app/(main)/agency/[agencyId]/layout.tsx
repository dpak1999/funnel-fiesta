import BlurPage from "@/components/global/blur-page";
import Infobar from "@/components/global/infobar";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: { agencyId: string };
}

const Layout: FC<LayoutProps> = async ({ children, params }) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  if (!agencyId) {
    return redirect("/agency");
  }

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  ) {
    return <Unauthorized />;
  }

  let allNotification: any = [];
  const notification = await getNotificationAndUser(agencyId);

  if (notification) {
    allNotification = notification;
  }

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar type="agency" id={params.agencyId} />
      <div className="md:pl-[300px]">
        <Infobar notifications={allNotification} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default Layout;
