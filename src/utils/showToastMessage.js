import { toast } from "react-toastify";

const toastOptions = {
  autoClose: 1000,
  position: toast.POSITION.TOP_RIGHT,
  draggable: true,
};

// type: 'success' | 'error'
const showToastMessage = (message, type) => {
  if (type === "success") return toast.success(message, toastOptions);
  if (type === "error") return toast.error(message, toastOptions);
};

export default showToastMessage;
