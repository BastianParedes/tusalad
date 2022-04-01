
import React from 'react';


export default function App() {

    let [url, setUrl] = React.useState('');
    let [token, setToken] = React.useState('');


    
    let pay = (event) => {
        event.preventDefault();
        
        let cart = sessionStorage.getItem('cart');
        cart = JSON.parse(cart);
        let buyingProducts = cart.products.filter((product) => product.quantity !== 0 );
        
        if (buyingProducts.length === 0) { // no permite comprar si el carrito está vacío. Esto puede pasar si el usuario edita el sessionStorage.
            alert('No agregaste nada al carrito.');
            return;
        }
        
        let totalPrice = 0;
        buyingProducts.forEach((product) => {
            totalPrice += product.quantity * product.price;
        });

        let sendingJSON = { products: buyingProducts};

        fetch('/api/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(sendingJSON)

        }).then(response => response.json()
        ).then(json => {
            setUrl(json.url);
            setToken(json.token);
            event.target.submit();
        });

    }
            


    return (
        <form action={url} method="POST" onSubmit={pay}>
            <input type="hidden" name="token_ws" value={token}/>
            <input type="submit" value="Pagar"/>
        </form>
    );
}
