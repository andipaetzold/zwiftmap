import { wrap } from "comlink";
import { ComlinkWorker } from "../types";
// @ts-expect-error
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!../worker/index";

const rawWorker = new Worker();
export const worker = wrap<ComlinkWorker>(rawWorker);
