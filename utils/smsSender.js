import twilio from "twilio";


export function sendSMS(receiver,content){
    
const client = twilio(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);

client.lookups.v2.phoneNumbers(receiver)
                 .fetch()
                 .then(phone_number => console.log(phone_number.phoneNumber));
client.messages.create({
            body: content ,
            to: phone_number.phoneNumber,
            from: process.env.PHONE_NUMBER 
        })
        .then(async (message) => {
            console.log(`OTP sent to ${receiver}`);
        })
        .catch(error => {
            console.error('Error sending SMS:', error);

        });
    
}