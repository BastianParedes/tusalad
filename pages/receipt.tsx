
import JSONProducts from '../public/products.json';
import React from 'react';
import { useRouter } from 'next/router';

export default function getStaticProps() {
    const router = useRouter();
    const token = router.query.token;
    let [info, setInfo] = React.useState({});
    
    React.useEffect(() => {
        if (token !== undefined) {
            fetch('/api/querydb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            }).then(response => response.json()
            ).then(json => {
                setInfo(json);
            });
        }
    }, [router])
    

    return (
        <h1>{JSON.stringify(info)}</h1>
    );
}
    
