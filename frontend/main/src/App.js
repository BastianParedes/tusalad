import React from 'react';
import './styles/general.css'

import Home from './components/home.jsx';
import Nav from './components/nav.jsx';
import About from './components/about.jsx';
import Services from './components/services.jsx';
import Products from './components/products.jsx';
import Contact from './components/contact.jsx'
import Footer from './components/footer.jsx';
import Modal from './components/modal.jsx';

import JSONProducts from './products.json';

const cart = {products: JSONProducts.products.map((product) => { return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 0,
    };
})};
sessionStorage.setItem('cart', JSON.stringify(cart));



export default function App() {
    let [openedModal, setOpenedModal] = React.useState(false);
    let [modalImageName, setModalImageName] = React.useState(null);


    let openModal = (newModalImageName) => {
        setModalImageName(newModalImageName);
        setOpenedModal(true);
    }
    let closeModal = () => setOpenedModal(false);

    return (<>
        <Home />
        <Nav />
        <About />
        <Services />
        <Products openModal={openModal} />
        <Contact />
        <Footer />
        {openedModal ? <Modal imageName={modalImageName} closeModal={closeModal}/> : <></>}
    </>);
}

