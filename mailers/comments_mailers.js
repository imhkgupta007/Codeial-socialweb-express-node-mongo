const nodemailer = require('../config/nodemailer');


// Another way of exporting a method
exports.newComment = comment => {
    console.log('inside newComment mailer');

    nodemailer.transporter.sendMail({
        from: 'imhkgupta007@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: '<h1>You, Your comment is now published!</h1>'
    }, (err, info) => {
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Messag sent', info);
        return;
    });
}