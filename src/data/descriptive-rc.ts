import { rcDrillsA, type RcDrill } from "@/data/descriptive-rc-a";
import { rcDrillsB } from "@/data/descriptive-rc-b";

export type { RcDrill };

export const rcDrills: RcDrill[] = [...rcDrillsA, ...rcDrillsB];
