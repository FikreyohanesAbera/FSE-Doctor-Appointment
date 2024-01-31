const express = require("express");
const db = require("../routes/db-config");
const bodyParser = require("body-parser");
const router = express.Router();
const stripe  = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const booked = require(("./book")).booked
const appointmentService = require("../services/appointment.service")
const price_per_appointment = 10000
router.use(express.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
let appointmentBooked = null;
router.post("/success", async(req, res) => {
    console.log("I'm here")
    const updatedAppointment = await appointmentService.updateAppointment(appointmentBooked.appointmentid)
    res.status(200).send(updatedAppointment)
})
router.post("/create-checkout-session", async (req, res) => {
    const appointment = req.body.appointment
    appointmentBooked = appointment
    const appointmentInfo = await appointmentService.getAppointments(appointment.appointmentid)
    console.log("payment with info", appointmentInfo)
    const session = await stripe.checkout.sessions.create({
        payment_method_types : ['card'],
        line_items: [{
            price_data: {
                currency: 'ETB',
                product_data:{
                    name: `Appointment: ${ appointment.appointmentid}`,
                    description: `You are paying for an appointment with id ${appointment.appointmentid}, at date ${appointmentInfo.date} and ${appointmentInfo.time} with doctor ${appointmentInfo.doctorid} `,
                    
                },
                unit_amount: price_per_appointment,
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url:`${process.env.CLIENT_URL}/Get_appointment`
    })
    console.log("session url", session.url, session)
    // const updatedAppointment = appointmentService.updateAppointment(appointment.appointmentid)
    res.status(200).send({url: session.url})
});

module.exports = router