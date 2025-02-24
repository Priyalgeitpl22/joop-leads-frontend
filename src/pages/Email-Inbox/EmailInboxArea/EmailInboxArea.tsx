import {
  Avatar,
  Box,
  Typography,
  Card,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {
  EmailInboxContainer,
  EmailInboxHeader,
  EmailInboxMessages,
} from "./EmailInboxArea.styled";

export default function EmailInboxArea() {

  return (
    <EmailInboxContainer>
      <EmailInboxHeader
        style={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 10,
          padding: "10px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar style={{ backgroundColor: "var(--theme-color)" }}>N</Avatar>
          <Typography variant="subtitle1">Noel Clarke</Typography>
          <StarBorderOutlinedIcon sx={{height: "20px"}}/>
          <InfoOutlinedIcon sx={{height: "18px"}}/>
          <ContentCopyOutlinedIcon sx={{height: "15px"}}/>
        </Box>
        <FormControl fullWidth sx={{ backgroundColor: "white", width: "30%" }}>
          <InputLabel sx={{margin: "-5px"}}>Mark lead as</InputLabel>
          <Select
            name="Mark lead as"
            label="Mark lead as"
            sx={{
              height: "40px",
              ".MuiSelect-select": {
                padding: "10px",
              },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 150,
                },
              },
            }}
          ></Select>
        </FormControl>

      </EmailInboxHeader>

      <EmailInboxMessages
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 150px)",
          padding: "10px",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Replied to <strong>Dharmendra 500 Leads</strong> (Email Sequence: 3)
          on Jan 24, 2025, 4:34 PM MST
        </Typography>

        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Re: Checking In: Tech Talent Solutions
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png" />
            <Box>
              <Typography fontWeight="bold">Noel Clarke</Typography>
              <Typography variant="body2" color="textSecondary">
                noelwclarke@gmail.com
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" mt={2}>
            <strong>To:</strong> yogesh@goldeneagle.work
          </Typography>
          <Typography variant="body2">
            <strong>CC:</strong> noel@theengine.com
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            Unsubscribe Yours, Noel W. Clarke (Babson MBA ‘09) 1-919-999-0955
            Mobile noelwclarke@gmail.com
            <br />
            <a href="http://www.linkedin.com/in/noelwclarke">
              LinkedIn Profile
            </a>
          </Typography>
        </Card>
      </EmailInboxMessages>
    </EmailInboxContainer>
  );
}
