
import React from 'react';


export default function App() {

    let [url, setUrl] = React.useState('');
    let [token, setToken] = React.useState('');

    let pay = (event) => {
        event.preventDefault();
        
        const data: {rut:string, name:string, e_mail:string, city:string, address:string, cart:{}} = {
            rut: event.target.rut.value,
            name: event.target.name.value,
            e_mail: event.target.e_mail.value,
            city: event.target.city.value,
            address: event.target.address.value,
            cart: JSON.parse(sessionStorage.getItem('cart'))
        };

        if (data.rut === '') {
            alert('No has ingresado tu rut');
            return;
        } else if (data.name === '') {
            alert('No has ingresado tu nombre');
            return;
        } else if (data.e_mail === '') {
            alert('No has ingresado tu E-mail');
            return;
        } else if (data.city === '') {
            alert('No has ingresado tu ciudad');
            return;
        } else if (data.address === '') {
            alert('No has ingresado tu dirección');
            return;
        } else if (data.cart === {}) { // no permite comprar si el carrito está vacío. Esto puede pasar si el usuario edita el sessionStorage.
            alert('No agregaste nada al carrito.');
            return;
        }

        fetch('/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()
        ).then(json => {
            if (json.status === 200) {
                setUrl(json.url);
                setToken(json.token);
                event.target.submit();
            } else if (json.status === 400){
                sessionStorage.setItem('cart', '{}');
                alert('No hay productos ingresados en el carrito');
            }
        });
    }

    let fixRut = (event): undefined => {
        const validCharacters: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'k'];
        const currentRut: string = event.target.value;
        let newRut: string = '';

        for (let letter of currentRut) {
            newRut += validCharacters.includes(letter) ? letter : '';
        }

        if (newRut.length == 0 || newRut.length == 1) {
            event.target.value = newRut;
            return undefined;
        }

        let lastCharacter: string = newRut[newRut.length - 1];
        newRut = newRut.substring(0, newRut.length - 1);
        newRut = newRut.replace('k','');
        let parts: string[] = newRut.split(/(?=(?:...)*$)/);;

        event.target.value = parts.join('.') + '-' + lastCharacter;
    }
    
    return (
        <form action={url} method='GET' onSubmit={pay}>
            <input type='text' name='rut' placeholder='rut' onChange={fixRut} defaultValue='19.111.648 - 8' />
            <input type='text' name='name' placeholder='Nombre' defaultValue='Bastián' />
            <input type='text' name='e_mail' placeholder='E-mail' defaultValue='bastian.p@outlook.com' />
            <select name='city'>
                <option value='Puerto Montt'>Puerto Montt</option>
                <option value='Puerto Varas'>Puerto Varas</option>
            </select>
            <input type='text' name='address' placeholder='Dirección' defaultValue='Crónica #2202' />
            <input type='hidden' name='token_ws' defaultValue={token} />
            <input type='submit' value='Pagar' />
        </form>
    );
}

