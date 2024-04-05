import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  handleSubmit?: () => void;
  children?: React.ReactNode;

}
export const ActionButton: React.FC<ButtonProps> = ({
  handleSubmit,
  children,
  
}) => {
  return (
    <Button variant="text" onClick={handleSubmit} type="submit" sx={{fontWeight:'bold'}} >
      {children}
    </Button>
  );
};

