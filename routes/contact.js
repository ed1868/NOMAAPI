const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')
const Message = require('../models/Message');
const { IgnorePlugin } = require('webpack');

const bcrypt = require('bcrypt')
const bcryptSalt = 10

const nodemailer = require("nodemailer");




const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

});


let emailSender = (emailData) => {

  let email = emailData.email;
  let subject = emailData.subject;
  let text = emailData.text;
  let name = emailData.name;
  let phone = emailData.phone;

  console.log("EMAILLL : ", email);
  transporter.sendMail({
    from: '"NEW INQUIRY" <myawesome@project.com>',
    to: email,
    subject: subject,
    html: `
        <!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <title>
              
            </title>
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
              #outlook a { padding:0; }
              body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
              table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
              img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
              p { display:block;margin:13px 0; }
            </style>
            <!--[if mso]>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
            
            
        <style type="text/css">
          @media only screen and (min-width:480px) {
            .mj-column-per-100 { width:100% !important; max-width: 100%; }
          }
        </style>
        
      
            <style type="text/css">
            
            
    
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile { width: 100% !important; }
          td.mj-full-width-mobile { width: auto !important; }
        }
      
            </style>
            
            
          </head>
          <body style="word-spacing:normal;background-color:#F4F4F4;">
            
            
          <div
             style="background-color:#F4F4F4;"
          >
            
          
          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        
          
          <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
            
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
            >
              <tbody>
                <tr>
                  <td
                     style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"
                  >
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                
          <div
             class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
          >
            
          <table
             border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
          >
            <tbody>
              
                  <tr>
                    <td
                       align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;"
                    >
                      
          <table
             border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"
          >
            <tbody>
              <tr>
                <td  style="width:180px;">
                  
          <img
             height="auto" src="https://louisianacontract.com/wp-content/uploads/2021/06/ailogo.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="180"
          />
        
                </td>
              </tr>
            </tbody>
          </table>
        
                    </td>
                  </tr>
                
                  <tr>
                    <td
                       align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;"
                    >
                      
          <div
             style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"
          ><p style="line-height: 18px; margin: 10px 0; text-align: center;font-size:14px;color:#1C99FE;font-family:'Times New Roman',Helvetica,Arial,sans-serif">Home&nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; NFT Store &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; About</p></div>
        
                    </td>
                  </tr>
                
            </tbody>
          </table>
        
          </div>
        
              <!--[if mso | IE]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        
          
          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        
          
          <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
            
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
            >
              <tbody>
                <tr>
                  <td
                     style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;"
                  >
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        
          
          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        
          
          <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
            
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
            >
              <tbody>
                <tr>
                  <td
                     style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;"
                  >
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                
          <div
             class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
          >
            
          <table
             border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
          >
            <tbody>
              
                  <tr>
                    <td
                       align="left" style="font-size:0px;padding:10px 25px;padding-top:25px;padding-bottom:5px;word-break:break-word;"
                    >
                      
          <div
             style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"
          ><p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:55px;color:#1C99FE;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>NOMA TOKEN WAITLIST</b></p></div>
        
                    </td>
                  </tr>
                
                  <tr>
                    <td
                       align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:20px;word-break:break-word;"
                    >
                      
          <div
             style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"
          ><p style="line-height: 30px; text-align: center; margin: 10px 0;color: white;font-size:25px;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>Please Verify Your Email <br></br>
                to receive first round of NOMA coins<br></br> - first 100 - On the house&nbsp;</b><br/></p></div>
        
                    </td>
                  </tr>
                
            </tbody>
          </table>
        
          </div>
        
              <!--[if mso | IE]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        
          
          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        
          
          <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
            
            <table
               align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
            >
              <tbody>
                <tr>
                  <td
                     style="direction:ltr;font-size:0px;padding:0 0 0 0;padding-bottom:40px;text-align:center;"
                  >
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                
          <div
             class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
          >
            
          <table
             border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
          >
            <tbody>
              
                  <tr>
                    <td
                       align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;"
                    >
                      
          <table
             border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"
          >
            <tr>
              <td
                 align="center" bgcolor="#fd4766" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#fd4766;" valign="middle"
              >
                <p
                   style="display:inline-block;background:#fd4766;color:#ffffff;font-family:Times New Roman, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"
                >
           <span style="color:#212020">Phone : ${phone}</span>
           <span style="color:#212020">Phone : ${name}</span>
           

                </p>
              </td>
            </tr>
          </table>
        
                    </td>
                  </tr>
                
                  <tr>
                    <td
                       align="left" style="font-size:0px;padding:10px 25px;padding-top:5px;padding-bottom:0px;word-break:break-word;"
                    >
                      
          <div
             style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"
          ></div>
        
                    </td>
                  </tr>
                
            </tbody>
          </table>
        
          </div>
        
              <!--[if mso | IE]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        
          
          <!--[if mso | IE]></td></tr></table><![endif]-->
        
        
          </div>
        
          </body>
        </html>
      `
  })
    .then(info => {
      console.log(`${info}YOU SENT AN EMAIL`)
      return info;
    }
    )
    .catch(error => console.log(error));
}

//GET ROUTE TO GET ALL USERS AND MESSAGES

router.get('/', (req, res, next) => {
  console.log("PULLING USERS...");

  User.find({}).then(payload => {
    console.log('PULLED USERS : ', payload);
  }).catch(err => {
    if (err) {
      console.log("ERROR : ", err);
    }
  });


  console.log("PULLING MESSAGES..");
  Message.find({}).then(payload => {
    console.log('PULLED MESSAGES : ', payload);
  }).catch(err => {
    if (err) {
      console.log("ERROR : ", err)
    }
  })
})


//POST ROUTE THAT WILL BE CALLED WHEN USER SUBMITS CONTACT ME FORM - THIS WILL SAVE USER AUTOMATICALLY TO KEEP TRACK OF USER QUERIES AND USE DATA TO TRAIN AI 


router.post('/request', (req, res, next) => {
  const { name, email, phone, subject, text } = req.body

  console.log('REQUEST BODY : ', req.body)
  // const email = "hwek21@gmail.com";
  // const username = email;
  // const phone = "7866086021"
  const password = bcrypt.hashSync('aiNomads', bcrypt.genSaltSync(bcryptSalt));
  // const subject = "just saying test one";
  // const text = "please baby dont fuck up my vibe"


  let emailPayload = {
    email, subject, text, phone, name
  }

  emailSender(emailPayload);

  return res.status(200).json({ message: "you were able to submit your message" })



  // User.findOne({ email }).then(user => {
  //     if (user != null) {
  //         // res.status(409).json({ message: "User already exist" });
  //         // return


  //         User.updateOne(
  //             { email: email },
  //             { $addToSet: { messages: [{ subject, text }] } },
  //             function (err, result) {
  //                 if (err) {
  //                     res.send(err);
  //                 } else {
  //                     // res.send(result);
  //                     console.log(result);
  //                 }
  //             }
  //         ).then(() => {
  //             let emailPayload = {
  //                 email, subject, text
  //             }
  //             emailSender(emailPayload);
  //            return  res.status(200).json({ message: "did a whole succesfull loop" });
  //         }).catch(err => {
  //             if (err) {
  //                 console.log('TENGO UN ERROR ', err
  //                 )
  //             }
  //         })


  //     } else {
  //         const salt = bcrypt.genSaltSync(bcryptSalt)
  //         const hashPass = bcrypt.hashSync(password, salt)
  //         const newUser = new User({
  //             username : name, password: hashPass, phone, email, messages: {
  //                 subject, text

  //             }
  //         });
  //         return newUser.save()
  //     }

  // }).then(userSaved => {
  //     if(userSaved){
  //         console.log("USER SAVED: ", userSaved);
  //         let newUserEmailPayload = {
  //             email, subject, text
  //         }
  //         emailSender(newUserEmailPayload);
  //         res.status(200).json({ message: "did a whole succesfull loop" });
  //     }

  // }).catch(err => {
  //     if (err) {
  //         console.log('ERROR : ', err);
  //         res.status(409).json({ message: err });
  //         return
  //     }
  // })


});






module.exports = router