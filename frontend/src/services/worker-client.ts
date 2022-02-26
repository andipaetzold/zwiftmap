import { wrap } from "comlink";
import { ComlinkWorker } from "../types";
import Worker from "../worker/index?worker";

const rawWorker = new Worker();
export const worker = wrap<ComlinkWorker>(rawWorker);
