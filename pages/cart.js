
import React from 'react';


export default function App() {

    let [url, setUrl] = React.useState('');
    let [token_ws, setToken_ws] = React.useState('');

    let pay = (event) => {
        event.preventDefault();
        
        const body = JSON.stringify({
            rut: event.target.rut.value,
            name: event.target.name.value,
            e_mail: event.target.e_mail.value,
            city: event.target.city.value,
            address: event.target.address.value,
            cart: JSON.parse(sessionStorage.getItem('cart'))
        });

        if (body.rut === '') {
            alert('No has ingresado tu rut');
            return;
        } else if (body.name === '') {
            alert('No has ingresado tu nombre');
            return;
        } else if (body['email'] === '') {
            alert('No has ingresado tu E-mail');
            return;
        } else if (body.city === '') {
            alert('No has ingresado tu ciudad');
            return;
        } else if (body.address === '') {
            alert('No has ingresado tu dirección');
            return;
        } else if (body.cart === {}) { // no permite comprar si el carrito está vacío. Esto puede pasar si el usuario edita el sessionStorage.
            alert('No agregaste nada al carrito.');
            return;
        }

        fetch('/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body
        }).then(response => response.json()
        ).then(json => {
            if (json.status === 200) {
                setUrl(json.url);
                setToken_ws(json.token_ws);
                event.target.submit();
            } else if (json.status === 400){
                sessionStorage.setItem('cart', '{}');
                alert('No hay productos ingresados en el carrito');
            }
        });
    }


    return (
        <form action={url} method='GET' onSubmit={pay}>
            <input type='text' name='rut' placeholder='rut' defaultValue='19.111.648-8' />
            <input type='text' name='name' placeholder='Nombre' defaultValue='Bastián' />
            <input type='text' name='e_mail' placeholder='E-mail' defaultValue='bastian.p@outlook.com' />
            <select name='city'>
                <option value='Puerto Montt'>Puerto Montt</option>
                <option value='Puerto Varas'>Puerto Varas</option>
            </select>
            <input type='text' name='address' placeholder='Dirección' defaultValue='Crónica #2202' />
            <input type='hidden' name='token_ws' defaultValue={token_ws} />
            <input type='submit' value='Pagar' />
        </form>
    );
}

