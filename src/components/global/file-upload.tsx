"use client";
import { FileIcon, X, XIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadThing";

interface FileUploadProps {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange: (url: string) => void;
  value: string;
}

const FileUpload: FC<FileUploadProps> = ({ apiEndpoint, onChange, value }) => {
  const type = value?.split(".")?.pop();

  if (value) {
    <div className="flex justify-center items-center flex-col">
      {type !== "pdf" ? (
        <div className="relative w-40 h-40">
          <Image alt="..." fill src={value} className="object-contain" />
        </div>
      ) : (
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
          <FileIcon />
          <a
            href={value}
            target="_blank"
            rel="noopener_noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            View PDF
          </a>
        </div>
      )}
      <Button onClick={() => onChange("")} type="button" variant={"ghost"}>
        <X className="h-4 w-4" /> Remove Logo
      </Button>
    </div>;
  }

  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res[0].url);
        }}
        onUploadError={(error: Error) => console.log({ error })}
      />
    </div>
  );
};

export default FileUpload;
