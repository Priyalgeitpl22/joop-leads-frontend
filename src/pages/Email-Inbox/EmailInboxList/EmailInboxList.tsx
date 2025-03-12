import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  getAllMailBox,
  setSelectedAccount,
  resetMailboxes,
} from "../../../redux/slice/emailInboxSlice";
import { Search } from "lucide-react";
// import { SearchBar } from "../../components/Header/header.styled";
import { SearchBar } from "../../../components/Header/header.styled";
import {
  EmailInboxListContainer,
  EmailInboxListHeader,
  HeaderTitle,
  AccountList,
  AccountItem,
  AccountAvatar,
  AccountDetails,
} from "./EmailInboxList.styled";
import { fetchEmailAccount } from "../../../redux/slice/emailAccountSlice";
import { EmailAccount } from "../../Email-Campaign/NewCampaign/SetupCampaign/Interface";

const EmailInboxList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.emailInbox.accounts);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  
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

  useEffect(() => {
    const getEmailAccounts = async () => {
      await getAllEmailAccounts();
    };

    getEmailAccounts();
  }, []);

  const getAllEmailAccounts = async () => {
    try {
      const data = await dispatch(fetchEmailAccount()).unwrap();
      setEmailAccounts(data);
      setRows(data);
    } catch (error) {
      console.error("Failed to fetch Account:", error);
    }
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery === "") {
      setRows(emailAccounts);
      return;
    }

    const filteredData = emailAccounts.filter(
      (account) =>
        account.name.toLowerCase().includes(trimmedQuery) ||
        account.email.toLowerCase().includes(trimmedQuery)
    );

    setRows(filteredData);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <EmailInboxListContainer>
      <SearchBar>
        <Search size={20} />
        <input
          placeholder="Search by Email or Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>

      <EmailInboxListHeader>
        <HeaderTitle>Inbox</HeaderTitle>
      </EmailInboxListHeader>
      <AccountList>
        {rows.length > 0 ? (
          rows.map((account) => (
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
          <div>No accounts found</div>
        )}
      </AccountList>
    </EmailInboxListContainer>
  );
};

export default EmailInboxList;
