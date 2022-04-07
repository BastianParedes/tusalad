import React from 'react';
import Head from 'next/head';

import 'normalize.css';
import '/public/styles.css';

export default function MyApp({ Component, pageProps }: any) {
    return (
        <>
            <Head>
                <title>Tu salad</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}