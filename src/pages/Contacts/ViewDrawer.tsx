import React from "react";
import { Drawer, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

interface ViewDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedId: string | null;
}



const ViewDrawer: React.FC<ViewDrawerProps> = ({ open, onClose, selectedId }) => {

    const {campaignList} = useSelector(
        (state: RootState) => state.contact
      );


      console.log("campaignList",campaignList);

  return (
<Drawer anchor="right" open={open} onClose={onClose}  sx={{ "& .MuiDrawer-paper": { width: 400} }} 
>
<div style={{border:"2px solid red", width: 500, padding:16 }}>
       <IconButton onClick={onClose} style={{ float: "right" }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Details</Typography>
        <Typography>ID: {selectedId}</Typography>
    </div>
    </Drawer>
  );
};

export default ViewDrawer;
