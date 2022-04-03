import React from 'react'
import { ToastContainer } from 'react-toastify'

function Notifier() {
  return (
    <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        limit={1}
        closeOnClick
        pauseOnHover
        toastClassName={() => "toast-wrapper"}
        style={{ background: "transparent" }}
      />
  )
}

export default Notifier