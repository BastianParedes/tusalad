
import React from 'react';


export default function App() {

    let [url, setUrl] = React.useState('');
    let [token, setToken] = React.useState('');


    let pay = (event) => {
        event.preventDefault();
        
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        
        if (cart === {}) { // no permite comprar si el carrito está vacío. Esto puede pasar si el usuario edita el sessionStorage.
            alert('No agregaste nada al carrito.');
            return;
        }
        
        fetch('/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(cart)
        }).then(response => response.json()
        ).then(json => {
            if (json.status === 200) {
                setUrl(json.url);
                setToken(json.token);
                // event.target.submit();
            } else if (json.status === 400){
                sessionStorage.setItem('cart', '{}');
                alert('No hay productos ingresados en el carrito');
            }
        });
    }


    return (
        <form action={url} method='POST' onSubmit={pay}>
            <input type='text' name='rut' placeholder='rut'/>
            <input type='text' name='name' placeholder='Nombre y apellido'/>
            <input type='text' name='e-mail' placeholder='E-mail'/>
            <input type='text' name='city' placeholder='Ciudad'/>
            <input type='text' name='address' placeholder='Dirección'/>
            <input type='hidden' name='token_ws' value={token}/>
            <input type='submit' value='Pagar'/>
        </form>
    );
}

