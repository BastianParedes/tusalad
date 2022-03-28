import Head from 'next/head';

import 'normalize.css';
import '../public/styles.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Tu salad</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}