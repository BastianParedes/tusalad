
import React from 'react';
import Home from '../components/index/components/home';
import Nav from '../components/index/components/nav';
import About from '../components/index/components/about';
import Services from '../components/index/components/services';
import Products from '../components/index/components/products';
import Contact from '../components/index/components/contact'
import Footer from '../components/index/components/footer';
import Modal from '../components/index/components/modal';



export default function Index() {
    let [openedModal, setOpenedModal] = React.useState(false);
    let [modalImageName, setModalImageName] = React.useState('');


    React.useEffect(() => {
        window.sessionStorage.setItem('cart', '{}');
    }, []);


    let openModal: any = (newModalImageName: string) : void=> {
        setModalImageName(newModalImageName);
        setOpenedModal(true);
    }

    let closeModal: any = () => setOpenedModal(false);


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
