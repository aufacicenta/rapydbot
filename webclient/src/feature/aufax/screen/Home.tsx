import { Box, Button } from "@material-ui/core";
import React from "react";

interface Props {}

const Component: React.FC<Props> = () => {
  const onTelegramLogin = () => {
    const auth_params = {
      bot_id: "1690293681",
      scope: {
        data: [{ type: "passport", selfie: true }, { type: "bank_statement" }],
        v: 1,
      },
      public_key: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApyUAzzCApFDbLOVSNO13
3BVh9mgvDd+WhkK8aCV0aYHMLxVL2tmYBzLpNKGI9n4gYHLAVl+m6W6+irAgFvEi
UwPVVzIGu5+nZRjRQAmzOuY+ljnZvde3ZClUjYRJhrAp+mSB4xmT14xkTi+ZROGh
UeMw7Mra9khIlGqxtZBnNAnjXV8PDpGp/xUpI27ubLsMb4bzPtehBqNXKhCIdHiN
0OteX3HCxk8e6Dsn9sUfy05oAZFVlMapuRwTVAmZI4HZmTrjyYIJx3DfbYga1FBA
WH4ri8+vif5VYNIacBzT20G9ua35SwF6R3tTAyF9052kXBIGCeiqLRMkD0j4futa
kwIDAQAB
-----END PUBLIC KEY-----`,
      nonce: "AAESnPBd2NTUlgx9TWMTDEmg3hyG7uUfFfQ",
      callback_url: "http://localhost:4000/callback?amount=123.00",
    };

    (window as any).Telegram.Passport.auth(auth_params, (show: any) => {
      if (show) {
        // some code to show tooltip
      } else {
        // some code to hide tooltip
      }
    });
  };

  return (
    <Box>
      <Button onClick={onTelegramLogin}>iniciar compra</Button>
    </Box>
  );
};

export const Home = Component;
