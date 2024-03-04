import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";

interface PipelinesProps {
  params: { subaccountId: string };
}

const Pipelines: FC<PipelinesProps> = async ({ params }) => {
  const pipelineExists = await db.pipeline.findFirst({
    where: {
      subAccountId: params.subaccountId,
    },
  });

  if (pipelineExists) {
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${pipelineExists.id}`
    );
  }

  try {
    const response = await db.pipeline.create({
      data: {
        name: "First Pipeline",
        subAccountId: params.subaccountId,
      },
    });

    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${response.id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default Pipelines;
