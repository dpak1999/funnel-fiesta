import { getAuthUserDetails } from "@/lib/queries";
import { FC } from "react";
import MenuOptions from "./menu-options";

interface SidebarProps {
  id: string;
  type: "agency" | "subaccount";
}

const Sidebar: FC<SidebarProps> = async ({ id, type }) => {
  const user = await getAuthUserDetails();
  if (!user || !user.Agency) return null;

  const details =
    type === "agency"
      ? user.Agency
      : user.Agency.SubAccount.find((s) => s.id === id);

  if (!details) return;

  const isWhiteLabelledAgency = user.Agency.whiteLabel;
  let sidebarLogo = user.Agency.agencyLogo;

  if (!isWhiteLabelledAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        user.Agency.SubAccount.find((s) => s.id === id)?.subAccountLogo ||
        user.Agency.agencyLogo;
    }
  }

  const sidebarOption =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((s) => s.id === id)?.SidebarOption || [];

  const subAccounts = user.Agency.SubAccount.filter((s) => {
    return user.Permissions.find((p) => p.subAccountId === s.id && p.access);
  });

  return (
    <>
      <MenuOptions
        details={details}
        id={id}
        defaultOpen
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOption}
        user={user}
        subAccounts={subAccounts}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOption}
        user={user}
        subAccounts={subAccounts}
      />
    </>
  );
};

export default Sidebar;
