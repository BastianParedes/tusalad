
import React from 'react';
import Home from '../components/index__home';
import Nav from '../components/index__nav';
import About from '../components/index__about';
import Services from '../components/index__services';
import Products from '../components/index__products';
import Contact from '../components/index__contact'
import CartButton from '../components/index__cartButton';
import Footer from '../components/index__footer';
import Modal from '../components/index__modal';




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

