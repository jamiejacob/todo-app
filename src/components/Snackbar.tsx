import { Snackbar } from "@mui/material";
import React from "react";

interface SnackbarProps{
    open:boolean
    handleClose:()=>void,
    children?:React.ReactNode,
    message:string
}

const SnackBar :React.FC<SnackbarProps>=({open,handleClose,children,message})=>{
return(
<Snackbar message={message} open={open} onClose={handleClose}   autoHideDuration={5000}></Snackbar>
)
}

export default SnackBar;