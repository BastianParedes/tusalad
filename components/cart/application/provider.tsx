import React from 'react';

export const Context: any = React.createContext({});



export const Provider = (props: any) => {
    const [cart, setCart] = React.useState({});
    // {"0":4,"1":2,"2":1,"3":0}
    React.useEffect((): void => {
        setCart(():void => JSON.parse(sessionStorage.getItem('cart') || '{}'));
    }, [])

    return (            
        <Context.Provider value={{cart, setCart}}>
            {props.children}
        </Context.Provider>
    );
}



