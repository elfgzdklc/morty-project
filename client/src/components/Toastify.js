import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toastify (status, title, message, callback)  {
  toast(
    <div>
      <p>{title}</p>
      <p>{message}</p>
    </div>, {
    title: title,
    position:'top-right',
    className: "toast-message",
    progress: false,
    autoClose: 2000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    closeButton: true,
    type: status,
    callback: callback(),
  })
}

