// 4051 8842 3993 7763
const JSONProducts: any = require('/public/products.json');
import React from 'react';
import { useRouter } from 'next/router';




export default function Receipt() {
    const router: any = useRouter();
    const buyOrder: string|undefined = router.query.buyOrder;
    let [info, setInfo] = React.useState({});
    
    React.useEffect((): void => {
        if (buyOrder !== undefined) {
            fetch('/api/querydb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({buyOrder})
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
    
