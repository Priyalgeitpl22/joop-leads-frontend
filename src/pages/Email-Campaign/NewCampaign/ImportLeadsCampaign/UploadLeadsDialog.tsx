import { Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Grid2";


interface UploadCsvDialogProps {
  open: boolean;
  onClose: () => void;
}

const UploadLeadsDialog: React.FC<UploadCsvDialogProps> = ({
  open,
  onClose
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box style={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            background: "#f1f2fb",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          No Leads Imported
        </DialogTitle>
      </Box>

      <DialogContent>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{
            borderBottom: "1px solid grey",
            paddingBottom: 1,
            marginBottom: 2,
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          Uploaded Leads
          <Typography variant="h5" fontWeight="bold">
            100
          </Typography>
        </Typography>

        {[
          { label: "Duplicate Leads", count: 0 },
          { label: "Existing Count", count: 100 },
          { label: "Blocked Email Count", count: 0 },
          { label: "Community Bounce Blocked Count", count: 0 },
          { label: "Empty Email Count", count: 0 },
          { label: "Invalid Email Count", count: 0 },
          { label: "Unsubscribed Leads", count: 0 },
          { label: "Duplicate Leads in Multiple Campaigns", count: 0 },
        ].map((item, index) => (
          <Grid2 container key={index} spacing={2} sx={{ marginBottom: 1 }}>
            <Grid2 size={{ xs: 9 }}>
              <Typography variant="body2" color="textSecondary">
                {item.label}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 3 }} textAlign="right">
              <Typography variant="body2" fontWeight="bold">
                {item.count}
              </Typography>
            </Grid2>
          </Grid2>
        ))}

        <Box
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6e58f1", color: "white", marginTop: "20px" }}
            onClick={onClose}
          >
            Okay
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default UploadLeadsDialog;