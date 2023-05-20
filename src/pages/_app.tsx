import { AppProps } from 'next/app';
import { Fragment } from 'react';
import "../styles/global.css";
import { WithStore } from '@/components/hooks/useStore';

/**
 * Basic next app initialization
 * [Reference doc]{@link https://nextjs.org/docs/pages/building-your-application/configuring/typescript#custom-app}
 */
export default function FunApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <WithStore>
        <Component {...pageProps} />
      </WithStore>
    </Fragment>
  )
}