
import JSONProducts from '/public/products.json';
import React from 'react';
import { useRouter } from 'next/router';

export default function getStaticProps(context) {
    const router = useRouter();
    const token_ws = router.query.token_ws;
    
    if (token_ws !== undefined) {
        fetch('/api/querydb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({token_ws})
        }).then(response => response.json()
        ).then(json => {
            console.log(json);
        });
    }

    return (
        <h1>Name</h1>
    );
}
    
