const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { customerInfo, cartItems, total } = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'yacinemed2020@gmail.com', // Remplacez par votre adresse e-mail
        from: 'yacinemed2020@gmail.com', // Remplacez par une adresse e-mail vérifiée par SendGrid
        subject: 'Nouvelle commande de Yacine Cosmétique',
        html: `
      <h1>Nouvelle Commande</h1>
      <h2>Informations Client:</h2>
      <ul>
        <li>Nom: ${customerInfo.firstName} ${customerInfo.lastName}</li>
        <li>Téléphone: ${customerInfo.phone}</li>
        <li>Wilaya: ${customerInfo.wilaya}</li>
        <li>Commune: ${customerInfo.communes}</li>
        <li>Adresse: ${customerInfo.address}</li>
      </ul>
      <h2>Détails de la Commande:</h2>
      <ul>
        ${cartItems.map(item => `
          <li>${item.name} (Quantité: ${item.quantity}, Prix: ${item.price} د.ج)</li>
        `).join('')}
      </ul>
      <h3>Total: ${total.toFixed(2)} د.ج</h3>
      <p>Merci de préparer cette commande.</p>
    `,
    };

    try {
        await sgMail.send(msg);
        return { statusCode: 200, body: 'Order submitted successfully!' };
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
        return { statusCode: 500, body: 'Failed to submit order.' };
    }
}; 