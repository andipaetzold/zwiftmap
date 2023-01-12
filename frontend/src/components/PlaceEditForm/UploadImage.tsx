import { FileInput } from "@react-md/form";
import { SimpleListItem } from "@react-md/list";
import { FileUploadSVGIcon } from "@react-md/material-icons";
import { useId } from "react";
import prettyBytes from "pretty-bytes";

interface Props {
  image: File | null;
  onChange: (image: File) => void;
}

export function UploadImage({ image, onChange }: Props) {
  return (
    <>
      <SimpleListItem>
        <FileInput
          id={useId()}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (!file) {
              return;
            }
            onChange(file);
          }}
          theme="clear"
          themeType="outline"
          icon={<FileUploadSVGIcon />}
          accept="image/png,image/jpeg"
          required
        >
          Upload
        </FileInput>
      </SimpleListItem>
      {image && (
        <SimpleListItem
          primaryText={image.name}
          secondaryText={`Size: ${prettyBytes(image.size)}`}
        />
      )}
    </>
  );
}
