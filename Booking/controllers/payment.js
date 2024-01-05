const express = require("express");
const db = require("../routes/db-config");
const bodyParser = require("body-parser");
const router = express.Router();
const stripe  = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const booked = require(("./book")).booked
const price_per_appointment = 10000
router.use(express.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
let appointment = {}
router.post("/prepare", (req, res) => {
    db.query('SELECT * FROM appointments WHERE appointmentid= ? ', [req.body.appointment.appointmentid],  (err, results) => {
        if (err) throw err;
        console.log(results)
        
        if (results) {
            appointment = {
                name: "appointment",
                appointment_id: results[0].appointmentid,
                doctorid: results[0].doctorid,
                patientid: results[0].patientid,
                time: results[0].time,
                date: results[0].date

            }

        } else {
            console.log("couldn't find appointment")
        }
    });
});
router.post("/create-checkout-session", booked, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types : ['card'],
        line_items: [{
            price_data: {
                currency: 'ETB',
                product_data:{
                    name: `Appointment: ${ appointment.appointment_id}`,
                    description: `You are paying for an appointment with id ${appointment.appointment_id}, at date ${appointment.date} and ${appointment.time} with doctor ${appointment.doctorid} `,
                    
                },
                unit_amount: price_per_appointment,
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: `${process.env.SERVER_URL}/payment/success`,
        cancel_url:`${process.env.SERVER_URL}/book`
    })
   
    res.send({url: session.url})
});

router.get("/success", (req, res) =>{
    db.query('UPDATE appointments SET paid = ? WHERE appointmentid= ?',[1, appointment.appointment_id],  (err, results) => {
        if(err) throw (err)
    })
    res.redirect("/success")
})
module.exports = router;
