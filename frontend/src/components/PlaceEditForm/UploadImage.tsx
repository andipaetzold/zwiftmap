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
      <SimpleListItem>
        <i>
          Images should not include any UI elements - please crop. Use the{" "}
          <a
            href="https://zwiftinsider.com/no-hud/"
            rel="noreferrer noopener"
            target="_blank"
          >
            &ldquo;Hide the Display&rdquo; mode
          </a>{" "}
          for perfect screenshots.
        </i>
      </SimpleListItem>
    </>
  );
}
