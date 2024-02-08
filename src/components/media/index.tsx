import MediaUploadButton from "@/components/media/upload-button";
import { GetMediaFiles } from "@/lib/types";
import { FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import MediaCard from "./media-card";
import { FolderSearch } from "lucide-react";

interface MediaComponentProps {
  data: GetMediaFiles;
  subaccountId: string;
}

const MediaComponent: FC<MediaComponentProps> = ({ data, subaccountId }) => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Media Bucket</h1>
        <MediaUploadButton subaccountId={subaccountId} />
      </div>

      <Command className="bg-transparent">
        <CommandInput placeholder="Search file name" />
        <CommandList className="pb-40 max-h-full">
          <CommandEmpty>No media files found</CommandEmpty>
          <CommandGroup heading="Media files">
            <div className="flex flex-wrap gap-4 pt-4">
              {data?.Media.map((d) => (
                <CommandItem
                  key={d.id}
                  className="p-0 w-full rounded-lg max-w-[300px] !bg-transparent !font-medium text-white"
                >
                  <MediaCard file={d} />
                </CommandItem>
              ))}

              {!data?.Media.length && (
                <div className="flex items-center justify-center w-full flex-col">
                  <FolderSearch
                    size={200}
                    className="dark:text-muted text-slate-300"
                  />
                  <p className="text-muted-foreground ">
                    Empty! no files to show.
                  </p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default MediaComponent;
