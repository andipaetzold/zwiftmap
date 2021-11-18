import { DoneCallback, Job } from "bull";
import { ENVIRONMENT } from "../../shared/config";
import { Share } from "../../shared/persistence/share";
import { cloudinary } from "../../shared/services/cloudinary";

export async function handleShareImage(job: Job<Share>, jobDone: DoneCallback) {
  const share = job.data;

  console.log(`Processing Share Image`, { jobId: job.id, shareId: share.id });

  const upload = await cloudinary.uploader.upload("https://picsum.photos/500", {
    folder: "shared",
    public_id: share.id,
    overwrite: true,
  });
  await cloudinary.uploader.add_tag(`env:${ENVIRONMENT}`, [upload.public_id]);

  jobDone();
}
