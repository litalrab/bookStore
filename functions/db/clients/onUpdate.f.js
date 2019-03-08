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

// const postmarkKey = functions.config().postmark.key
// const mailTransport = nodemailer.createTransport(postmarkTransport({
//         auth: {
//                 apiKey: postmarkKey
//         }
// }))
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'geshemshelsfarim@gmail.com',
           pass: 'kbook4567'
       }
   });
/*exports.dbCreate = functions.database.ref('/path').onCreate((snap, context) => {
    const createdData = snap.val(); // data that was created
  });*/
// 4. Watch for new users
//exports = module.exports = functions.database.ref('/clients').onCreate((event) => {
exports = module.exports = functions.database.ref('/clients/{uid}').onWrite((snap, context) =>{
  //  const user = snap.val(); // data that was created
   
   
    const original = snap.after.val();
   
    console.log('event.data: '+original);
    console.log('snapshot: '+original.name);

      //  const snapshot = event.data
       // const user = snapshot.val()
        // Use nodemailer to send email
        return sendEmail(original);
    });
//})

function sendEmail(user) {
    console.log('user isAdmin: : '+user.isAdmin );
    console.log(`user email is : ${user.email}`);
    console.log(`user order is : ${user.orderObj}`);
    console.log('user order : '+user.orderObj );
    for (const key in user.orderObj) {
      if (user.orderObj.hasOwnProperty(key)) {
        const element = user.orderObj[key];
        console.log('user order key : '+element );

      }
    }

        // 5. Send welcome email to new users
        const mailOptions = {
                //from: ' dave@gmail.com',
                to: 'geshemshelsfarim@gamil.com',
                subject: 'Welcome!',
                html: ` <p>Your html here</p>
                user order is : ${user.orderObj}
                user email is : ${user.email}`
               // plain text body
        }
        // 6. Process the sending of this email via nodemailer
        return transporter.sendMail(mailOptions)
                .then(() => console.log('dbCompaniesOnUpdate:Welcome confirmation email'))
                .catch((error) => console.error('There was an error while sending the email:', error))
}