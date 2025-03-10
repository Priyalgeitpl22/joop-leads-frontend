import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  getAllMailBox,
  setSelectedAccount,
  resetMailboxes,
} from "../../../redux/slice/emailInboxSlice";
import { Search } from "lucide-react";
import ReplayIcon from "@mui/icons-material/Replay";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import {
  EmailInboxListContainer,
  SearchContainer,
  SearchInput,
  EmailInboxListHeader,
  HeaderTitle,
  HeaderIcons,
  AccountList,
  AccountItem,
  AccountAvatar,
  AccountDetails,
} from "./EmailInboxList.styled";

const EmailInboxList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.emailInbox.accounts);
  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );

  useEffect(() => {
    if (accounts.length > 0 && !selectedAccountId) {
      const firstAccountId = accounts[0]._id;
      dispatch(setSelectedAccount(firstAccountId));
      dispatch(getAllMailBox(firstAccountId));
    }
  }, [accounts, selectedAccountId, dispatch]);

  const handleAccountClick = (accountId: string) => {
    dispatch(resetMailboxes());
    dispatch(setSelectedAccount(accountId));
    dispatch(getAllMailBox(accountId));
  };

  return (
    <EmailInboxListContainer>
      <SearchContainer>
        <Search size={18} />
        <SearchInput type="text" placeholder="Search Account" />
      </SearchContainer>

      <EmailInboxListHeader>
        <HeaderTitle>Inbox</HeaderTitle>
        <HeaderIcons>
          <ReplayIcon fontSize="small" />
          <FilterAltOutlinedIcon fontSize="small" />
          <SortOutlinedIcon fontSize="small" />
        </HeaderIcons>
      </EmailInboxListHeader>

      <AccountList>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountItem
              key={account._id}
              onClick={() => handleAccountClick(account._id)}
              data-selected={selectedAccountId === account._id}
            >
              <AccountAvatar>{account.name[0]?.toUpperCase()}</AccountAvatar>
              <AccountDetails>
                <strong>{account.name}</strong>
                <div>{account.email}</div>
              </AccountDetails>
            </AccountItem>
          ))
        ) : (
          <div>No accounts available</div>
        )}
      </AccountList>
    </EmailInboxListContainer>
  );
};

export default EmailInboxList;
