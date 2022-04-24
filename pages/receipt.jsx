// 4051 8842 3993 7763
// http://localhost:3000/receipt?buyOrder=6265595819d76701e5752604
const JSONProducts = require('/public/products.json');
import jsPDF from 'jspdf';
import React from 'react';
import { useRouter } from 'next/router';
import { MdMargin } from 'react-icons/md';
import { disconnect } from 'process';




export default function Receipt() {
    const router = useRouter();
    const buyOrder = router.query.buyOrder;
    let [data, setData] = React.useState({});
    let [URLpdf, setURLpdf] = React.useState('');

    React.useEffect(async () => {
        if (buyOrder !== undefined) {
            let response = await fetch('/api/querydb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({buyOrder})
            });
            let json = await response.json();
            setData(json);
        }
    }, [router])


    React.useEffect(() => {
        if (Object.keys(data).length === 0) {return;}
        // let doc = new jsPDF();
        // doc.deletePage(1);
        // doc.addPage();
        // doc.internal.pageSize.setWidth(imageWidth);
        // doc.internal.pageSize.setHeight(imageHeight);
        // doc.addImage(base64, 'png', 0, 0, imageWidth, imageHeight);
        // let pageWidth = doc.internal.pageSize.getWidth();
        // let pageHeight = doc.internal.pageSize.getHeight();
        // doc.addImage(base64, 'png', leftMargin, topMargin, newImageWidth, newImageHeight);
        // doc.save('PDF constructor.pdf');
        // doc.addPage(this.state.pageSize, this.state.pageOrientation);
        // let imageInfo = doc.getImageProperties(base64);


        let doc = new jsPDF();
        let pageWidth = doc.internal.pageSize.getWidth();
        let pageHeight = doc.internal.pageSize.getHeight();

        const lado = 90;

        // doc.text("Gracias por comprar con nosotros!", 100, pageWidth/2);
        // doc.addImage("/images/logo.jpg", "JPEG", pageWidth/2-lado/2, pageHeight/2-lado/2, lado, lado);

        doc.html

        setURLpdf(URL.createObjectURL(doc.output("blob")));


    }, [data]);





    return (
        // <h1>{JSON.stringify(data)}</h1>
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
        }}>
            <iframe src={URLpdf} type="application/pdf" style={{
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                }}>
            </iframe>
        </div>
    );
}
