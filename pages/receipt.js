
import JSONProducts from '/public/products.json';
import { useRouter } from "next/router";
import React from 'react';

export default function getStaticProps(context) {
    const router = useRouter();
    const token = router.query.token_ws;
    
    if (token !== undefined) {
        fetch('/api/db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        }).then(response => response.json()
        ).then(json => {

            console.log(json);

        });
    }

    return (
        <h1>Name</h1>
    );
}
    
