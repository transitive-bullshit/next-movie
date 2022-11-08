'use client'

import {
  DefaultToastOptions,
  Toaster as ReactHotToaster
} from 'react-hot-toast'

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  success: {
    duration: 4000
  },
  error: {
    duration: 6000
  }
}

export function Toaster() {
  return <ReactHotToaster position='top-right' toastOptions={toastOptions} />
}
