import JSONProducts from '../products.json';

import React from 'react';
import Home from '../components/index/components/home.jsx';
import Nav from '../components/index/components/nav.jsx';
import About from '../components/index/components/about.jsx';
import Services from '../components/index/components/services.jsx';
import Products from '../components/index/components/products.jsx';
import Contact from '../components/index/components/contact.jsx'
import Footer from '../components/index/components/footer.jsx';
import Modal from '../components/index/components/modal.jsx';



export default function App() {
    let [openedModal, setOpenedModal] = React.useState(false);
    let [modalImageName, setModalImageName] = React.useState(null);


    React.useEffect(() => {
        const cart = {products: JSONProducts.products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 0,
            };
        })};
        window.sessionStorage.setItem('cart', JSON.stringify(cart));
    }, []);


    let openModal = (newModalImageName) => {
        setModalImageName(newModalImageName);
        setOpenedModal(true);
    }
    let closeModal = () => setOpenedModal(false);


    return (
        <React.StrictMode>
            <Home />
            <Nav />
            <About />
            <Services />
            <Products openModal={openModal} />
            <Contact />
            <Footer />
            {openedModal ? <Modal imageName={modalImageName} closeModal={closeModal}/> : <></>}
        </React.StrictMode>
    );
}

