import { activityCreateQueue } from "../shared/queue";

activityCreateQueue.process((job, jobDone) => {
  console.log(job.data);

  jobDone();
});
