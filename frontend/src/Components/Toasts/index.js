import { toast } from "react-hot-toast";
import Alert from "../Alert";

export const ToastError = ({ message }) => {
  toast.custom((t) => <Alert t={t} message={message} type="error" />);
};

export const ToastSuccess = ({ message }) => {
  toast.custom((t) => <Alert t={t} message={message} type="success" />);
};

export const ToastInfo = ({ message }) => {
  toast.custom((t) => <Alert t={t} message={message} type="info" />);
};

export const ToastWarning = ({ message }) => {
  toast.custom((t) => <Alert t={t} message={message} type="warning" />);
};

export const ToastBasic = ({ message }) => {
  toast.custom((t) => <Alert t={t} message={message} type="basic" />);
};
