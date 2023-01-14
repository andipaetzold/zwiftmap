import { FileInput } from "@react-md/form";
import { SimpleListItem } from "@react-md/list";
import { FileUploadSVGIcon } from "@react-md/material-icons";
import { useEffect, useId, useState } from "react";
import prettyBytes from "pretty-bytes";
import { Typography } from "@react-md/typography";

const SIZE_LIMIT = 512 * 1024;

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
          secondaryText={
            <Typography
              color={image.size > SIZE_LIMIT ? "theme-error" : "hint"}
            >
              Size:{" "}
              {prettyBytes(image.size, {
                binary: true,
              })}{" "}
              / {prettyBytes(SIZE_LIMIT, { binary: true })}
            </Typography>
          }
        />
      )}
    </>
  );
}
