import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { setConfiguration } from "react-grid-system";
import "../theme/globals.scss";

setConfiguration({ containerWidths: [540, 740, 960, 1280, 1540], gutterWidth: 32 });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
