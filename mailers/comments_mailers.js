const nodemailer = require('../config/nodemailer');


// Another way of exporting a method
exports.newComment = comment => {
    // console.log('inside newComment mailer', comment);

    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        to: 'imhkgupta007@gmail.com',
        from: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Message sent', info);
        return;
    });
}