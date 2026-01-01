/**

AWS Lambda Function

Process WordPress Waitlist signups and sync to Customer.io */

const CustomerIO = require('customerio-node'); const cio = new CustomerIO('SITE_ID', 'API_KEY');

exports.handler = async (event) => { const data = JSON.parse(event.body);

const { email, phone, role, license_id } = data;

try {
    await cio.identify(email, {
        phone: phone,
        role: role, // 'hygienist' or 'dentist'
        license_verified: !!license_id,
        signup_date: Math.floor(Date.now() / 1000),
        source: 'pre-launch-landing-page'
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Lead Synced to Outreach Engine" })
    };
} catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
    };
}


};