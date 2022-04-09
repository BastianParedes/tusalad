
const JSONProducts: any = require('/public/products.json');
import React from 'react';
import { useRouter } from 'next/router';




export default function Receipt() {
    const router: any = useRouter();
    const token: string|undefined = router.query.token;
    let [info, setInfo] = React.useState({});
    
    React.useEffect((): void => {
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
    
