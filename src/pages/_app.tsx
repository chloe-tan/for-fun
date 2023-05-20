import { AppProps } from 'next/app';
import { Fragment } from 'react';
import "../styles/global.css";
import { WithStore } from '@/components/hooks/useStore';
import ToastComponent from '@/components/ToastComponent';
import { WithToast } from '@/components/hooks/useToast';

/**
 * Basic next app initialization
 * [Reference doc]{@link https://nextjs.org/docs/pages/building-your-application/configuring/typescript#custom-app}
 */
export default function FunApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <WithStore>
        <WithToast>
          <Component {...pageProps} />
        </WithToast>
      </WithStore>
    </Fragment>
  )
}