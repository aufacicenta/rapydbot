import { MomentFormatSpecification, MomentInput } from "moment";

import client from "./client";

const fromFormat = (inp?: MomentInput, format?: MomentFormatSpecification, strict: boolean = false) =>
  client(inp, format, strict);

const fromDefaultFormat = (inp?: MomentInput, strict: boolean = false) => fromFormat(inp, "YYYY-MM-DD HH:mm", strict);

export default {
  fromFormat,
  fromDefaultFormat,
};
