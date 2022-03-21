
import './styles/general.css'

import Home from './components/home.jsx';
import Nav from './components/nav.jsx';
import About from './components/about.jsx';
import Services from './components/services.jsx';
import Products from './components/products.jsx';
import Contact from './components/contact.jsx'
import Footer from './components/footer.jsx';

function App() {
    return (<>
        <Home />
        <Nav />
        <About />
        <Services />
        <Products />
        <Contact />
        <Footer />
    </>);
}

export default App;
