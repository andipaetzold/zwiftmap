import { FileInput } from "@react-md/form";
import { SimpleListItem } from "@react-md/list";
import { FileUploadSVGIcon } from "@react-md/material-icons";
import { useEffect, useId, useState } from "react";
import prettyBytes from "pretty-bytes";

interface Props {
  error: boolean;
  image: File | null;
  onChange: (image: File) => void;
}

export function UploadImage({ error, image, onChange }: Props) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (image === null) {
      setKey((k) => k + 1);
    }
  }, [image]);

  return (
    <>
      <SimpleListItem>
        <FileInput
          key={key}
          id={useId()}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (!file) {
              return;
            }
            onChange(file);
          }}
          theme={error ? "error" : "clear"}
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
