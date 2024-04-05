import { createContext, useContext, useState } from "react";
import SnackBar from "../components/Snackbar";

interface NotificationContextModel {
    showSnackbar: (message: string) => void;
  }
export const NotificationContext = createContext({} as NotificationContextModel );

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const showSnackbar = (message: string) => {
    setMessage(message);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <NotificationContext.Provider value={{showSnackbar}}>
      {children}
      <SnackBar
        message={message}
        open={open}
        handleClose={handleClose}
      ></SnackBar>
    </NotificationContext.Provider>
  );
};

export const useSnackbar = () => useContext(NotificationContext);
