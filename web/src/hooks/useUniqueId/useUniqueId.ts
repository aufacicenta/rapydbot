import { useEffect, useState } from "react";

import { getSuccessiveIntegersGenerator } from "./getSuccessiveIntegersGenerator";

const getNextInteger = getSuccessiveIntegersGenerator();

type UseUniqueIdProps = {
  prefix?: string;
  idFromProps?: string;
};

export const useUniqueId = ({ prefix, idFromProps }: UseUniqueIdProps = {}): string | undefined => {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (idFromProps || id) return;
    setId(`${prefix || ""}${getNextInteger()}`);
  }, [prefix, idFromProps, id]);

  return idFromProps || id;
};
