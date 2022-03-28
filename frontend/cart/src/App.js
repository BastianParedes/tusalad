import React from 'react';

export default function App() {

    let url = sessionStorage.getItem('url');
    let token = sessionStorage.getItem('token');
    
    return (
        <form action={url} method="POST">
            <input type="hidden" name="token_ws" value={token}/>
            <input type="submit" value="Pagar"/>
        </form>
    );
}
