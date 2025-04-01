const Contact = require("../modal/contactModal");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "arijitghosh1203@gmail.com",
    pass: "sbkz nlun jawd ykki",
  },
});

exports.addContact = async (req, res) => {
  try {
    console.log("come")
    const { email, phone, message, name, company, subject,related } = req.body;
    const contact = new Contact({
      email,
      phone,
      message,
      name,
      company,
      subject,
      related
    });

    await contact.save();

    // const mailOptions = {
    //   from: "arijitghosh1203@gmail.com",
    //   to: email,
    //   subject: "Thank you for contacting us!",
    //   html: `
    //     <html>
    //       <head>
    //         <style>
    //           body {
    //             font-family: Arial, sans-serif;
    //             background-color: #f4f4f4;
    //             color: #333;
    //             padding: 20px;
    //           }
    //           .container {
    //             background-color: #ffffff;
    //             padding: 20px;
    //             border-radius: 8px;
    //             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    //           }
    //           .header {
    //             background-color: #4CAF50;
    //             color: white;
    //             padding: 10px 0;
    //             text-align: center;
    //             border-radius: 8px 8px 0 0;
    //           }
    //           .footer {
    //             text-align: center;
    //             color: #999;
    //             font-size: 12px;
    //             margin-top: 20px;
    //           }
    //         </style>
    //       </head>
    //       <body>
    //         <div class="container">
    //           <div class="header">
    //             <h2>Contact Confirmation</h2>
    //           </div>
    //           <p>Dear ${email},</p>
    //           <p>Thank you for reaching out to us! We have successfully received your contact details:</p>
    //           <ul>
    //             <li><strong>Email:</strong> ${email}</li>
    //             <li><strong>Phone:</strong> ${phone}</li>
    //             <li><strong>Message:</strong> ${message}</li>
    //           </ul>
    //           <p>We will get back to you shortly!</p>
    //           <p>Best regards,</p>
    //           <p>Your Company Name</p>
    //         </div>
    //         <div class="footer">
    //           <p>&copy; 2024 Your Company. All Rights Reserved.</p>
    //         </div>
    //       </body>
    //     </html>
    //   `,
    // };

    // await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.addTouchContact = async (req, res) => {
  try {
    const { email, phone, name } = req.body;
    const contact = new Contact({
      email,
      phone,
      name,
      getTouch: true,
    });

    await contact.save();

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany();
    res
      .status(200)
      .json({ success: true, message: "All contacts deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
