
import React from 'react';
import Home from '../components/index/home';
import Nav from '../components/index/nav';
import About from '../components/index/about';
import Services from '../components/index/services';
import Products from '../components/index/products';
import Contact from '../components/index/contact'
import CartButton from '../components/index/cartButton';
import Footer from '../components/index/footer';
import Modal from '../components/index/modal';




export default function Index() {
    let [openedModal, setOpenedModal] = React.useState(false);
    let [modalImageName, setModalImageName] = React.useState('');


    React.useEffect((): void => {
        window.sessionStorage.setItem('cart', '{}');
    }, []);


    let openModal = (newModalImageName: string) : void => {
        setModalImageName(newModalImageName);
        setOpenedModal(true);
    }

    let closeModal = (): void => {
        setOpenedModal(false);
    }


    return (
        <>
            <Home />
            <Nav />
            <div style={{position: 'relative'}}>
                <About />
                <Services />
                <Products openModal={openModal} />
                <Contact />
                <CartButton />
            </div>
            <Footer />
            {openedModal ? <Modal imageName={modalImageName} closeModal={closeModal}/> : <></>}
        </>
    );
}

