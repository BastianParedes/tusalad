
import './styles/normalize.css';

// import  from './components/.jsx' ;
import Header from './components/header.jsx'
import Nav from './components/nav.jsx' ;
import Carousel from './components/carousel.jsx' ;
import Footer from './components/footer.jsx'

function App() {
    return (<>
        <Nav />
        <Header />
        <Carousel />
        <Footer />
    </>);
}

export default App;
