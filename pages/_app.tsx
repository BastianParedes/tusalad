
import 'normalize.css';
import '/public/styles/styles.css';

import React from 'react';
import Head from 'next/head';
import { Provider } from '../components/application/provider';

export default function MyApp({ Component, pageProps }: any) {
    return (
        <React.StrictMode>
            <Provider>
                <Head>
                    <title>Tu salad</title>
                </Head>
                <Component {...pageProps} />
            </Provider>
        </React.StrictMode>
    );
}