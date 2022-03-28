import React from 'react';

export default function App() {


    // React.useEffect(() => {
    //     let cart = sessionStorage.getItem('cart');
    //     cart = JSON.parse(cart);
    //     let buyingProducts = cart.products.filter((product) => {
    //         return product.quantity !== 0;
    //     });

    //     if (buyingProducts.length === 0) { // no permite comprar si el carrito está vacío. Esto puede pasar si el usuario edita el sessionStorage.
    //         alert('No agregaste nada al carrito.');
    //         return;
    //     }

    //     let totalPrice = 0;
    //     buyingProducts.forEach((product) => {
    //         totalPrice += product.quantity * product.price;
    //     });

    //     let sendingJSON = { products: buyingProducts};

    //     fetch('http://localhost:3000/buy', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify(sendingJSON)
    //     })
    //     .then(response => response.json())
    //     .then(json => {
    //         sessionStorage.setItem('url', json.url);
    //         sessionStorage.setItem('token', json.token);
    //         setUrl(json.url);
    //         setToken(json.token);
    //         // window.location.href = "http://localhost:3000/cart/";
    //         // window.location.href = "/cart/";
    //     });
    // }, []);




    let url = sessionStorage.getItem('url');
    let token = sessionStorage.getItem('token');
    
    return (
        <form action={url} method="POST">
            <input type="hidden" name="token_ws" value={token}/>
            <input type="submit" value="Pagar"/>
        </form>
    );
}
