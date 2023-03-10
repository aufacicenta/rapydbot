import { useRouter } from "next/router";
import { useEffect } from "react";

import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

export const useGetAuthToken = () => {
  const router = useRouter();
  const ls = useLocalStorage();

  useEffect(() => {
    const { query } = router;
    const { token } = query;

    if (!token) {
      return;
    }

    ls.set("token", token as string);
  }, [router]);
};
