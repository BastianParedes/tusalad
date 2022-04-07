
import React from 'react';


export default function App() {

    let [url, setUrl] = React.useState('');
    let [token, setToken] = React.useState('');

    let pay = (event: any) => {
        event.preventDefault();
        
        const rut: string = event.target.rut.value;
        const name: string = event.target.name.value;
        const e_mail: string = event.target.e_mail.value;
        const city: string = event.target.city.value;
        const address: string = event.target.rut.value;
        const cart: any = JSON.parse(sessionStorage.getItem('cart') || '{}');

        if (rut === '') {
            alert('No has ingresado tu rut');
            return;
        } else if (name === '') {
            alert('No has ingresado tu nombre');
            return;
        } else if (e_mail === '') {
            alert('No has ingresado tu E-mail');
            return;
        } else if (city === '') {
            alert('No has ingresado tu ciudad');
            return;
        } else if (address === '') {
            alert('No has ingresado tu dirección');
            return;
        } else if (cart === {}) { // no permite comprar si el carrito está vacío. Esto puede pasar si el usuario edita el sessionStorage.
            alert('No agregaste nada al carrito.');
            return;
        }

        fetch('/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({rut, name, e_mail, city, address, cart})
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

    let fixRut = (event: any): undefined => {
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

