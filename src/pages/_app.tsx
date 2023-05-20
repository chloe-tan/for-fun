import { AppProps } from 'next/app';
import { Fragment } from 'react';
import "../styles/global.css";

/**
 * Basic next app initialization
 * [Reference doc]{@link https://nextjs.org/docs/pages/building-your-application/configuring/typescript#custom-app}
 */
export default function FunApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  )
}