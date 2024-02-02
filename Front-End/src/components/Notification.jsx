import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="bg-green-200 p-3 mb-2 rounded">
      Remaining Time:{message}
    </div>
  );
};

export default Notification;