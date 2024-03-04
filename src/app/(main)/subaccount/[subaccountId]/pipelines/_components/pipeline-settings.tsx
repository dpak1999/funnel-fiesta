"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Pipeline } from "@prisma/client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { deletePipeline, saveActivityLogsNotification } from "@/lib/queries";
import CreatePipelineForm from "@/components/forms/create-pipeline-form";

interface PipelineSettingsProps {
  pipelineId: string;
  subAccountId: string;
  pipelines: Pipeline[];
}

const PipelineSettings: FC<PipelineSettingsProps> = ({
  pipelineId,
  pipelines,
  subAccountId,
}) => {
  const router = useRouter();

  return (
    <AlertDialog>
      <div>
        <div className="flex items-center justify-between mb-4">
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete Pipeline</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                pipeline and remove any related data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    const response = await deletePipeline(pipelineId);

                    await saveActivityLogsNotification({
                      agencyId: undefined,
                      description: `Deleted a pipeline | ${response?.name}`,
                      subaccountId: subAccountId,
                    });

                    toast({
                      title: "Deleted",
                      description: "Pipeline is deleted",
                    });
                    router.replace(`/subaccount/${subAccountId}/pipelines`);
                  } catch (error) {
                    toast({
                      variant: "destructive",
                      title: "Oppsie!",
                      description: "Could not Delete Pipeline",
                    });
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>

        <CreatePipelineForm
          subAccountId={subAccountId}
          defaultData={pipelines.find((p) => p.id === pipelineId)}
        />
      </div>
    </AlertDialog>
  );
};

export default PipelineSettings;
