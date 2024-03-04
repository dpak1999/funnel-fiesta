import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { getLanesWithTicketAndTags, getPipelineDetails } from "@/lib/queries";
import { LaneDetail } from "@/lib/types";
import { redirect } from "next/navigation";
import { FC } from "react";
import PipelineInfobar from "../_components/pipeline-infobar";
import PipelineSettings from "../_components/pipeline-settings";

interface PipelinePageProps {
  params: { subaccountId: string; pipelineId: string };
}

const PipelinePage: FC<PipelinePageProps> = async ({ params }) => {
  const pipelineDetails = await getPipelineDetails(params.pipelineId);

  if (!pipelineDetails) {
    return redirect(`/subaccount/${params.subaccountId}/pipelines`);
  }

  const pipelines = await db.pipeline.findMany({
    where: {
      subAccountId: params.subaccountId,
    },
  });

  const lanes = (await getLanesWithTicketAndTags(
    params.pipelineId
  )) as LaneDetail[];

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="bg-transparent border-b-2 h16 w-full justify-between mb-4">
        <PipelineInfobar
          pipelineId={params.pipelineId}
          subAccountId={params.subaccountId}
          pipelines={pipelines}
        />

        <div>
          <TabsTrigger value="view">Pipeline View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </div>
      </TabsList>

      <TabsContent value="view"></TabsContent>
      <TabsContent value="settings">
        <PipelineSettings
          pipelineId={params.pipelineId}
          subAccountId={params.subaccountId}
          pipelines={pipelines}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PipelinePage;
