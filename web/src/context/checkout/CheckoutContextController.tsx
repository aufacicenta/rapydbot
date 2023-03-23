import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { useToastContext } from "hooks/useToastContext/useToastContext";
import { Typography } from "ui/typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";

import { CheckoutContext } from "./CheckoutContext";
import {
  BTCPayCheckoutOptions,
  BTCPayInvoiceMetadata,
  CheckoutContextControllerProps,
  CheckoutState,
} from "./CheckoutContext.types";

export const CheckoutContextController = ({ children }: CheckoutContextControllerProps) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const toast = useToastContext();
  const routes = useRoutes();
  const { locale } = useRouter();
  const { t } = useTranslation("common");

  const getCheckoutURL = async ({ checkout, campaign }: BTCPayCheckoutOptions) => {
    try {
      setIsLoading(true);

      const { campaignId } = campaign;

      const metadata: BTCPayInvoiceMetadata = { campaignId };

      const response = await fetch(routes.api.getCheckoutURL(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata,
          checkout: {
            ...checkout,
            locale,
          },
        }),
      });

      const content = await response.json();

      if (!content?.checkoutLink) {
        throw new Error("Invalid BTC checkout content at CheckoutContextController:getCheckoutURL");
      }

      setCheckoutState({
        url: content.checkoutLink,
      });

      setIsLoading(false);
    } catch {
      setError(
        "Error at CheckoutContextController:getCheckoutURL. Check server logs as this may have happened in the API side.",
      );

      setIsLoading(false);

      // @TODO i18n
      toast.trigger({
        variant: "error",
        title: "Error",
        withTimeout: false,
        children: <Typography.Text>{t("checkoutContextController.error.getCheckoutURL")}</Typography.Text>,
      });
    }
  };

  const props = useMemo(() => ({ getCheckoutURL, checkoutState, isLoading, error }), [error, isLoading, checkoutState]);

  return <CheckoutContext.Provider value={props}>{children}</CheckoutContext.Provider>;
};
