// 4051 8842 3993 7763
// import styles from './styles.module.css';

import React from 'react';
import { useRouter } from 'next/router';

const JSONProducts: any = require('/public/products.json');

export default function Receipt() {
    const router: any = useRouter();
    const buyOrder: string|undefined = router.query.buyOrder;
    let [info, setInfo] = React.useState({});
    
    React.useEffect((): void => {
        if (buyOrder !== undefined) {
            fetch('/api/querydb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({buyOrder})
            }).then(response => response.json()
            ).then(json => {
                setInfo(json);
            });
        }
    }, [router])





    // generatePdf = () => {
    //     this.checkIfEveryBase64IsLoaded();
    //     if (this.state.files.length === 0) {
    //         alert('No has ingresado ninguna imagen.');
    //         return;
    //     };

    //     this.setState({openedModal: true});
    //     let doc = new jsPDF();
    //     doc.deletePage(1);

    //     let promise = Promise.resolve();



    //     for (let info of this.state.files) {
    //         promise = promise.then(() => new Promise((resolve, reject) => {
    //             let base64 = this.infoToGeneratePdf[info.key]['base64'];
    //             let imageRotation = this.infoToGeneratePdf[info.key]['imageRotation'];

    //             let image = new Image();
    //             image.src = base64;
    //             image.addEventListener('load', (event) => {
    //                 let imageWidth;
    //                 let imageHeight;
    //                 if (imageRotation === 0) { //imagen sin rotar
    //                     imageWidth = image.width;
    //                     imageHeight = image.height;

    //                 } else { // imagen rotada
    //                     const canvas = document.createElement('canvas');
    //                     let ctx = canvas.getContext('2d');
    //                     canvas.width = imageRotation % 180 === 0 ? image.width : image.height;
    //                     canvas.height = imageRotation % 180 === 0 ? image.height : image.width;

    //                     ctx.translate(canvas.width / 2, canvas.height / 2);
    //                     ctx.rotate(-imageRotation * Math.PI / 180);
    //                     ctx.drawImage(image, image.width / -2, image.height / -2);

    //                     base64 = canvas.toDataURL();

    //                     let imageInfo = doc.getImageProperties(base64);
    //                     imageWidth = imageInfo['width'];
    //                     imageHeight = imageInfo['height'];
    //                 }

    //                 if (this.state.pageSize === 'adjusted') {
    //                     doc.addPage();
    //                     doc.internal.pageSize.setWidth(imageWidth);
    //                     doc.internal.pageSize.setHeight(imageHeight);
    //                     doc.addImage(base64, 'png', 0, 0, imageWidth, imageHeight);
    //                 } else {
    //                     doc.addPage(this.state.pageSize, this.state.pageOrientation);
    //                     let pageWidth = doc.internal.pageSize.getWidth();
    //                     let pageHeight = doc.internal.pageSize.getHeight();

    //                     let newImageWidth = pageWidth / pageHeight <= imageWidth / imageHeight ? pageWidth : imageWidth * pageHeight / imageHeight;
    //                     let newImageHeight = pageWidth / pageHeight <= imageWidth / imageHeight ? imageHeight * pageWidth / imageWidth : pageHeight;

    //                     let leftMargin = (pageWidth - newImageWidth) / 2;
    //                     let topMargin = (pageHeight - newImageHeight) / 2;

    //                     doc.addImage(base64, 'png', leftMargin, topMargin, newImageWidth, newImageHeight);
    //                 }
    //                 resolve();
    //             });
    //         }));
    //     };
    //     promise.then(() => new Promise((resolve, reject) => {
    //         this.setState({openedModal: false});
    //         doc.save('PDF constructor.pdf');
    //     }));
    // }












    return (
        <h1>{JSON.stringify(info)}</h1>
    );
}