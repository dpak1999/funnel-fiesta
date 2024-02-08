"use client";
import { NotificationWithUser } from "@/lib/types";
import { UserButton } from "@clerk/nextjs";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Bell } from "lucide-react";
import { Switch } from "../ui/switch";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./mode-toggle";

interface InfobarProps {
  notifications: NotificationWithUser | [];
  role?: string;
  className?: string;
  subAccountId?: string;
}

const Infobar: FC<InfobarProps> = ({
  notifications,
  subAccountId,
  className,
  role,
}) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications);
    } else {
      if (notifications?.length !== 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            []
        );
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ",
          className
        )}
      >
        <div className="flex items-center gap-2 ml-auto">
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
                <Bell size={17} />
              </div>
            </SheetTrigger>
            <SheetContent className="mt-4 mr-4 pr-4 overflow-scroll">
              <SheetHeader className="text-left mb-4">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
                    <Card className="flex items-center justify-between p-4">
                      Current Subaccount
                      <Switch onCheckedChange={handleClick} />
                    </Card>
                  )}
                </SheetDescription>
              </SheetHeader>
              {allNotifications?.map((notif) => (
                <div
                  key={notif.id}
                  className="flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis"
                >
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage alt="..." src={notif.User.avatarUrl} />
                      <AvatarFallback className="bg-primary">
                        {notif.User.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p>
                        <span className="font-bold">
                          {notif.notification.split("|")[0]}
                        </span>
                        <span className="text-muted-foreground">
                          {notif.notification.split("|")[1]}
                        </span>
                        <span className="font-bold">
                          {notif.notification.split("|")[2]}
                        </span>
                      </p>
                      <small className="text-xs text-muted-foreground">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
              {allNotifications?.length === 0 && (
                <div className="flex items-center justify-center text-muted-foreground mb-4">
                  You have no notifications
                </div>
              )}
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default Infobar;
