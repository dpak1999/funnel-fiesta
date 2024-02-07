import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import DeleteButton from "./_components/delete-button";
import CreateSubaccountButton from "./_components/create-sub-account-button";

interface AllSubaccontsPageProps {
  params: { agencyId: string };
}

const AllSubaccontsPage: FC<AllSubaccontsPageProps> = async ({ params }) => {
  const user = await getAuthUserDetails();

  if (!user) return;

  return (
    <AlertDialog>
      <div className="flex flex-col">
        <CreateSubaccountButton
          user={user}
          className="w-[200px] mt-6 mb-6 self-end"
        />
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Account..." />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Sub Accounts">
              {!!user.Agency?.SubAccount.length ? (
                user.Agency.SubAccount.map((s) => (
                  <CommandItem
                    key={s.id}
                    className="h-32 !bg-background my-2 border-border p-4 rounded-lg border-[1px] cursor-pointer transition-all"
                  >
                    <Link
                      href={`/subaccount/${s.id}`}
                      className="flex gap-4 w-full h-full"
                    >
                      <div className="relative w-32">
                        <Image
                          alt=".."
                          fill
                          src={s.subAccountLogo}
                          className="rounded-md object-contain p-4 bg-muted/50"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {s.name}
                          <span className="text-muted-foreground text-xs">
                            {s.address}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <AlertDialogTrigger asChild>
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        className="w-20 hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                          Are you sure?
                        </AlertDialogTitle>

                        <AlertDescription className="text-left">
                          This action cannot be undone. This will delete the
                          subaccount and all data related to it.
                        </AlertDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel className="mb-2">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive">
                          <DeleteButton subaccountId={s.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </CommandItem>
                ))
              ) : (
                <div className="text-muted-foreground p-4 text-center">
                  No Sub accounts
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default AllSubaccontsPage;
