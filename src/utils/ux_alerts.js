import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const sucessToast = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  Toast.fire({
    type: 'success',
    title: msg
  })
}

export const errorMsg = (msg) => {
  Swal.fire({
    type: 'error',
    title: 'Oops...',
    text: msg
  })
}