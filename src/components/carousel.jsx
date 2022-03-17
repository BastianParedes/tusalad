import React from "react";

function Item(props) {
    return (
        <></>
    );
}








export default function Carousel() {
    let images = React.useRef(['A Plague Tale Innocence.png', 'A Way Out.jpg', 'Alan Wake.jpg', 'Alice.jpg', 'Bioshock.jpg']);
    let [currentImage, setCurrentImage] = React.useState(images.current[0]);

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         let currentIndex = images.current.indexOf(currentImage);
    //         let newIndex = (currentIndex + 1) % images.current.length;
    //         setCurrentImage(images.current[newIndex]);
    //     }, 1000);
    // }, [currentImage]);


    return (
        <div className="carousel">
            {/* <img className="prevImage" src={require('../carousel images/' + images.current[(images.current.indexOf(currentImage) - 1) % images.current.length])} alt=''/> */}
            <img className="currentImage" src={require('../carousel images/' + currentImage)} alt={currentImage} />
            <img className="nextImage" src={require('../carousel images/' + images.current[(images.current.indexOf(currentImage) + 1) % images.current.length])} alt=''/>
            <button className="btnPrevImage">&lt;</button>
            <button className="btnNextImage">&gt;</button>
        </div>
    );
}
