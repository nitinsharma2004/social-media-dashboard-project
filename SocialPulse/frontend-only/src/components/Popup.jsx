import React, { useEffect } from "react";

const Popup = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor =
        type === "success"
            ? "bg-green-100 border-green-500 text-green-700"
            : type==="warning"? "bg-yellow-100 border-yellow-500 text-yellow-700": "bg-red-100 border-red-500 text-red-700" ;

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 border-l-4 p-4 rounded shadow-md w-72 ${bgColor}`}>
            <p className="text-sm font-medium">{message}</p>
        </div>

    );
};

export default Popup;
