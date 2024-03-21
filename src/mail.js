const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:"",
        pass:""
    },
})

const sendMailRecovery = (to, subject, message)=>{
    return transport.sendMail({
        //from:"Santos Legros santos.legros11@ethereal.email",
        to: to,
        subject:subject,
        html:message
    })


}
module.exports = {transport, sendMailRecovery}
