import React from "react";

const Notification = ({ show, type = "success", message }) => {
  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div
        className={`px-6 py-4 rounded-lg shadow-xl font-medium ${
          type === "error"
            ? "bg-red-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
