const JSONProducts = require('/public/products.json');
import jsPDF from 'jspdf';
import React from 'react';
import { useRouter } from 'next/router';




export default function Receipt() {
    const router = useRouter();
    const buyOrder = router.query.buyOrder;
    let [URLpdf, setURLpdf] = React.useState('');

    React.useEffect(async () => {
        if (buyOrder === undefined) {return;}

        //pide la data de la transacción al backend
        let response = await fetch('/api/querydb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({buyOrder})
        });
        let transactionData = await response.json();




        

        //crea el pdf
        const doc = new jsPDF();
        doc.internal.pageSize.setHeight(0);
        const pageWidth = doc.internal.pageSize.getWidth();

        const lado = 50;
        doc.addImage("/images/logo.jpg", "JPEG", pageWidth/2-lado/2, 5, lado, lado);

        
        if (transactionData.status.status === 'AUTHORIZED') {
            let text = 'Gracias por comprar con nosotros!';
            doc.text(text, (pageWidth - doc.getTextWidth(text))/2, 60);
        } else if (transactionData.status.status === 'FAILED') {
            let text = 'La transacción ha sido cancelada';
            doc.text(text, (pageWidth - doc.getTextWidth(text))/2, 60);
            text = 'Si aún desea comprar puede hacerlo a travéz de nuestra página';
            doc.text(text, (pageWidth - doc.getTextWidth(text))/2, 70);
            text = 'Volver a la página';
            doc.textWithLink(text, (pageWidth - doc.getTextWidth(text))/2, 80, { url: location.origin });
        } else if (transactionData.status.status === 'INITIALIZED') {
            let text = 'La transacción aún no se ha completado';
            doc.text(text, (pageWidth - doc.getTextWidth(text))/2, 60);
        }



        let headers = {
            'Orden de compra': transactionData.status.buy_order,
            'Estado de la compra': {'AUTHORIZED':'Autorizado','FAILED':'Fallido','INITIALIZED':'Incompleto'}[transactionData.status.status],
            'Monto': transactionData.status.amount.toString(),
            'Fecha': transactionData.status.transaction_date,
            'Método de pago': {VD:'Venta Débito',VN:'Venta Normal',VC:'Venta en cuotas',SI:'3 cuotas sin interés',S2:'2 cuotas sin interés',NC:'N Cuotas sin interés',VP:'Venta Prepago'}[transactionData.status.payment_type_code],
            'Rut': transactionData.rut,
            'Nombre': transactionData.name,
            'Teléfono': transactionData.phone,
            'E-mail': transactionData.e_mail,
            'Ciudad': transactionData.city,
            'Dirección': transactionData.address
        };

        let i = 0;
        for (let header in headers) {
            doc.text(header, pageWidth/2-doc.getTextWidth(header)-5, 10*i+100);
            doc.text(headers[header] || '-', pageWidth/2+5, 10*i+100);
            i++;
        }

        i++;
        let text = 'Productos comprados';
        doc.text(text, (pageWidth - doc.getTextWidth(text))/2, 10*i+100);
        i++;

        for (let productID in transactionData.products) {
            let productData = JSONProducts[productID];
            let productQuantity = transactionData.products[productID];
            let productName = productData.name;
            doc.text(`${productQuantity} x   ${productName} (Código: ${productID})`, 20, 10*i+100);
            i++;
        }
        doc.internal.pageSize.setHeight(-(10*i+100));
        
        setURLpdf(URL.createObjectURL(doc.output("blob")));
    }, [router])






    return (
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
