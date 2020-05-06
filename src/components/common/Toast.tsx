import { toast } from 'react-toastify'

const toastProps = {
  position: toast.POSITION.BOTTOM_CENTER,
  autoClose: 3500,
}

export const success = (text: string) => toast.success(text, toastProps)

export const error = (text: string) => toast.error(text, toastProps)
