import React from 'react';

export const Context: any = React.createContext({});



export const Provider = (props: any) => {
    const min: number = 0;
    const max: number = 20;
    const [cart, setCart] = React.useState({});

    React.useEffect((): void => {
        setCart(():void => JSON.parse(sessionStorage.getItem('cart') || '{}'));
    }, [])

    React.useEffect((): void => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    return (            
        <Context.Provider value={{min, max, cart, setCart}}>
            {props.children}
        </Context.Provider>
    );
}



