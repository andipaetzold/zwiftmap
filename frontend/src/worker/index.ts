import { expose } from "comlink";
import { ComlinkWorker } from "../types";
import { fetchRoads } from "./fetch-roads";
import { navigate } from "./navigate";
import { snapPoint } from "./snap-point";

const worker: ComlinkWorker = {
  navigate,
  snapPoint,
  fetchRoads,
};

expose(worker);
