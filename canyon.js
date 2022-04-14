import fetch from "node-fetch";
import nodemailer from "nodemailer";

let result = ""
let count = 0
while(true){
  result = await fetch("https://webapi.xanterra.net/v1/api/availability/rooms/yellowstonenationalparklodges/YLYC:RV?room_code=T12&date=08%2F21%2F2022&rate_code=INTERNET&is_group=false&limit=1", {
    "headers": {
      "accept": "application/json",
      "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
      "authorization": "",
      "content-type": "application/json",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://secure.yellowstonenationalparklodges.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  })
  .then(res => res.text())
  .then(data => JSON.parse(data))
  count = result.availability["08/21/2022"].rooms[0].available;
  if(count!==0){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: ""
      }
    })
    const mailOptions = {
      from: '',
      to: '',
      subject: "!!! Camp Available !!!",
      text: "Book it now!",
      html: "<b>Hurry!</b>"
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        return console.log(error);
      }
      console.log("Email sent.");
    })
    break;
  }
  await new Promise(r => setTimeout(r, 60000));
}
