import styles from './styles.module.css';
import React from 'react';
import { Context } from '../../application/provider';
const JSONProducts: any = require('/public/products.json');



export default function Aside() {
    let context: any = React.useContext(Context);
    let [url, setUrl] = React.useState('');
    let [token, setToken] = React.useState('');

    let pay = (event: any) => {
        event.preventDefault();
        
        const rut: string = event.target.rut.value;
        const name: string = event.target.name.value;
        const phone: string = event.target.phone.value;
        const e_mail: string = event.target.e_mail.value;
        const city: string = event.target.city.value;
        const address: string = event.target.address.value;
        const cart: any = context.cart;

        if (rut === '') {
            alert('No has ingresado tu rut');
            return;
        } else if (name === '') {
            alert('No has ingresado tu nombre');
            return;
        } else if (phone === '') {
            alert('No has ingresado tu teléfono');
            return;
        } else if (e_mail === '') {
            alert('No has ingresado tu E-mail');
            return;
        } else if (phone === '') {
            alert('No has ingresado tu número de teléfono');
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
            body: JSON.stringify({rut, name, phone, e_mail, city, address, cart})
        }).then(response => response.json()
        ).then(json => {
            if (json.status === 200) {
                setUrl(json.url);
                setToken(json.token);
                event.target.submit();
            } else {
                alert(json.message);
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
        <aside className={styles['aside']}>
            <form className={styles['form']} action={url} method='GET' onSubmit={pay}>
                <h2>Rut:</h2>
                <input className={styles['input-rut']} type='text' name='rut' placeholder='11.111.111-1' onChange={fixRut} />
                <h2>Nombre:</h2>
                <input className={styles['input-name']} type='text' name='name' placeholder='Nombre' />
                <h2>Teléfono:</h2>
                <input className={styles['input-phone']} type='text' name='phone' placeholder='9 9999 9999' />
                <h2>E-mail:</h2>
                <input className={styles['input-e_mail']} type='text' name='e_mail' placeholder='ejemplo@ejemplo.com' />
                <h2>Ciudad:</h2>
                <select className={styles['input-city']} name='city'>
                    <option value='Puerto Montt'>Puerto Montt</option>
                    <option value='Puerto Varas'>Puerto Varas</option>
                </select>
                <h2>Dirección:</h2>
                <input className={styles['input-address']} type='text' name='address' placeholder='Dirección' />
                <h2>Monto total:</h2>
                <h2 className={styles['amount']}>{'$ '+ Object.keys(context.cart).reduce((amount, key) => {
                    let quantity = context.cart[key];
                    let price = JSONProducts[key].price;
                    return amount + quantity * price;
                }, 0)}</h2>
                <input className={styles['input-submit']} type='submit' value='Pagar' />
                <input type='hidden' name='token_ws' value={token} />
            </form>
        </aside>
    );
}
