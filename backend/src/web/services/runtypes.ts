import { String } from "runtypes";

export const NumberString = String.withConstraint((s) => !Number.isNaN(+s));
