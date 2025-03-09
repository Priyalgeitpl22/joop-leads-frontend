import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  getAllMailBox,
  setSelectedAccount,
  resetMailboxes
} from "../../../redux/slice/emailInboxSlice";
import { Search } from "lucide-react";
import ReplayIcon from "@mui/icons-material/Replay";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";


const EmailInboxList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.emailInbox.accounts);

  const handleAccountClick = (accountId: string) => {
    dispatch(resetMailboxes()); 
    dispatch(setSelectedAccount(accountId));
    dispatch(getAllMailBox(accountId));
  };

  return (
    <div
      style={{
        width: "30%",
        borderRight: "1px solid #ddd",
        padding: "10px",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Search size={18} style={{ marginRight: "8px", color: "#777" }} />
        <input
          type="text"
          placeholder="Search Account"
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            flex: 1,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
          Inbox
        </h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <ReplayIcon
            fontSize="small"
            style={{ cursor: "pointer", color: "#777" }}
          />
          <FilterAltOutlinedIcon
            fontSize="small"
            style={{ cursor: "pointer", color: "#777" }}
          />
          <SortOutlinedIcon
            fontSize="small"
            style={{ cursor: "pointer", color: "#777" }}
          />
        </div>
      </div>

      <div>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <div
              key={account._id}
              onClick={() => handleAccountClick(account._id)}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                transition: "background 0.2s",
                borderRadius: "8px",
                marginBottom: "5px",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1f3f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      backgroundColor: "rgb(9 16 115)",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {account.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <strong style={{ fontSize: "15px" }}>{account.name}</strong>
                    <div style={{ fontSize: "15px", color: "#777" }}>
                      {account.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No accounts available</div>
        )}
      </div>
    </div>
  );
};

export default EmailInboxList;
