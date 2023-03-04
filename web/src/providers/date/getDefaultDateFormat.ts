import moment from "./client";

export const now = () => moment();

export const toUtcOffsetNanoseconds = (date?: number | string) =>
  moment(date).utcOffset(0).toDate().getTime() * 1000000;

export const toNanoseconds = (date: number) => date * 1000000;
export const fromNanoseconds = (date: number) => date / 1000000;

export const extractNanoseconds = (date: number) => Number(date.toString().slice(0, 13));

export const fromTimestampWithOffset = (timestamp: number, utcOffset: number) =>
  `${moment(extractNanoseconds(timestamp)).utcOffset(utcOffset).format("ddd, MMM DD YYYY hh:mm A")} GMT${
    utcOffset < 0 ? "" : "+"
  }${utcOffset}:00`;

export const fromTimestamp = (timestamp: number) =>
  `${moment(extractNanoseconds(timestamp)).format("MM/DD/YYYY HH:mm")}`;

export default (date?: Date | string | number) => moment(date || undefined).format("MMM DD, YYYY");
