import React, { useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
export const PaymentSuccessPage = () => {
    const pathname = window.location.pathname;
  useEffect(() => {
      try {
        fetch("http://localhost:3001/payment/success", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
             message: "ok"
            })
          })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
      } catch (error) {
        console.error(error);
      }

  }, []);

  return (
    <div className='p-5 h-lvh text-center  w-lvw bg-blue-400'>
      <h1 className='text-5xl m-5'>Payment Successful</h1>
      <p>Your payment has been committed successfully.</p>
      <Link to="/Patient_pro" className="login">
      <button className="bg-primaryColor m-auto mt-10 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
       Go to my profile
      </button>
    </Link>
    </div>
  );
};
