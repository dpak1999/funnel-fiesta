import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface LaunchpadProps {
  params: {
    agencyId: string;
  };
  searchParams: { code: string };
}

const Launchpad: FC<LaunchpadProps> = async ({ params, searchParams }) => {
  const agencyDetails = await db.agency.findUnique({
    where: { id: params.agencyId },
  });

  if (!agencyDetails) return;

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Lets get started</CardTitle>
            <CardDescription>
              Follow the steps below to setup your account with us
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex gap-4 flex-col md:items-center md:!flex-row">
                <Image
                  height={80}
                  width={80}
                  alt="..."
                  className="rounded-md object-contain"
                  src={"/assets/appstore.png"}
                />

                <p>Save the website as a shortcut on your mobile device</p>
              </div>

              <Button>Start</Button>
            </div>

            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex gap-4 flex-col md:items-center md:!flex-row">
                <Image
                  height={80}
                  width={80}
                  alt="..."
                  className="rounded-md object-contain"
                  src={"/assets/stripelogo.png"}
                />

                <p>Connect your stripe account to accept payments</p>
              </div>

              <Button>Start</Button>
            </div>

            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex gap-4 flex-col md:items-center md:!flex-row">
                <Image
                  height={80}
                  width={80}
                  alt="..."
                  className="rounded-md object-contain"
                  src={agencyDetails.agencyLogo}
                />

                <p> Fill in all your bussiness details</p>
              </div>

              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  href={`/agency/${params.agencyId}/settings`}
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Launchpad;
