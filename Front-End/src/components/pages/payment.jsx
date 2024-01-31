import React, { useState } from 'react';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Here you would typically handle payment processing logic
    // For this example, we'll just log the entered details
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVC:', cvc);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-md" onSubmit={handlePaymentSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter card number"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="MM/YY"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvc">
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter CVC"
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => {alert("Successfully Booked")}}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
