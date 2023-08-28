import { NList } from './utils';
export type Show = (delayTimeMs: number) => Promise<void>;
export type SortFn = (l: NList, f: Show) => void;