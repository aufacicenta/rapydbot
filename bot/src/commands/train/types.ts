import { CustomMessage } from "../../types";

export type Action = {
  action: (msg: CustomMessage) => Promise<void>;
  initialInstruction: string;
  isTimeoutSet: boolean;
  isLast?: boolean;
};

export type Actions = {
  [key: string]: Action;
};
