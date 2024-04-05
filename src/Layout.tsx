import { Box } from "@mui/material";
import React from "react";

export default function Layout({ children }:{children:React.ReactNode}) {
    return (          
            <div >
                <Box component="header" sx={{borderBottom:'1px solid grey',backgroundColor:'lightskyblue',padding:'15px'}}>             
                   <h2> My TODOs</h2>
                </Box>
          {children}
          </div>
        
      
    );
  }