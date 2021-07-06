export function containsErrorCode(error: Error, errorCodexLike: object) {
  const errorMessage = error?.message;
  const errorCodes = Object.values(errorCodexLike);

  const containsCode = Boolean(
    errorCodes.filter((msg) => errorMessage.includes(msg)).shift()
  );
  const errorId = Object.keys(errorCodexLike)
    .map((msgKey) => errorCodexLike[msgKey])
    .filter((msg) => errorMessage.includes(msg))
    .shift();

  const errorMappingInfo = {
    containsCode,
    errorId,
  };

  return errorMappingInfo;
}
