import { expose } from "comlink";
import { ComlinkWorker } from "../types";
import { navigate } from "./navigate";

const worker: ComlinkWorker = {
  navigate,
};

expose(worker);
