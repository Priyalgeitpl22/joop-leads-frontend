import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ManualFollowUp = () => {
  const [fields, setFields] = useState([""]);

  const addField = () => {
    setFields([...fields, ""]);
  };

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };
  return (
    <>
      {fields.map((field, index) => (
        <div style={{ marginTop: "10%", marginBottom: "15%" }} key={index}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "8px" }}>{index + 1}.</Typography>
            <TextField
              value={field}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              margin="normal"
              placeholder="Subject----"
            />
          </div>
          <Button
            variant="outlined"
            onClick={addField}
            sx={{
              mr: 4,
              float: "right",
              fontSize: "10px",
              fontWeight: "600",
            }}
          >
            + Add stepss
          </Button>
        </div>
      ))}
    </>
  );
};

export default ManualFollowUp;
