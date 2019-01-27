// 1. Deploys as dbUsersOnUpdate
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const postmarkTransport = require('nodemailer-postmark-transport')
const admin = require('firebase-admin')

// 2. Admin SDK can only be initialized once
try {admin.initializeApp(functions.config().firebase)} catch(e) {
        console.log('dbCompaniesOnUpdate initializeApp failure')
}

// 3. Google Cloud environment variable used:
// firebase functions:config:set postmark.key="API-KEY-HERE"
const postmarkKey = functions.config().postmark.key
const mailTransport = nodemailer.createTransport(postmarkTransport({
        auth: {
                apiKey: postmarkKey
        }
}))
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'user@gmail.com',
           pass: 'hfc'
       }
   });
/*exports.dbCreate = functions.database.ref('/path').onCreate((snap, context) => {
    const createdData = snap.val(); // data that was created
  });*/
// 4. Watch for new users
//exports = module.exports = functions.database.ref('/clients').onCreate((event) => {
exports = module.exports = functions.database.ref('/clients/{uid}').onCreate((snap, context) =>{
    const user = snap.val(); // data that was created
    console.log('event.data: '+snap);
    console.log('snapshot: '+user.name);

      //  const snapshot = event.data
       // const user = snapshot.val()
        // Use nodemailer to send email
        return sendEmail(user);
    });
//})

function sendEmail(user) {
    console.log('user email : '+user.email );
    console.log('user email is : ${user.email}');
        // 5. Send welcome email to new users
        const mailOptions = {
                //from: ' dave@gmail.com',
                to: 'litalrab@gamil.com',
                subject: 'Welcome!',
                html: '<p>Your html here</p>'// plain text body
        }
        // 6. Process the sending of this email via nodemailer
        return transporter.sendMail(mailOptions)
                .then(() => console.log('dbCompaniesOnUpdate:Welcome confirmation email'))
                .catch((error) => console.error('There was an error while sending the email:', error))
}