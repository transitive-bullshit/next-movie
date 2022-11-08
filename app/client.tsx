'use client'

import { DefaultToastOptions, Toaster } from 'react-hot-toast'

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  success: {
    duration: 4000
  },
  error: {
    duration: 6000
  }
}

export function Client() {
  return <Toaster position='top-right' toastOptions={toastOptions} />
}
