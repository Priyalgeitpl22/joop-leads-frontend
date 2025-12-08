import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  getAllMailBox,
  setSelectedAccount,
  resetMailboxes,
  setSelectedMailbox,
  getAllEmailThreads,
} from "../../../redux/slice/emailInboxSlice";
import { Search } from "lucide-react";
import {
  EmailInboxListContainer,
  AccountList,
  AccountItem,
  AccountAvatar,
  AccountDetails,
  EmailInboxHeading,
  SearchBar,
  NoAccount,
  AccountSelectorDivider,
  AccountSelectorText,
} from "./EmailInboxList.styled";
import { EmailAccount } from "../../../redux/slice/emailAccountSlice";

interface EmailInboxListProps {
  onAccountSelect?: () => void;
  accounts: EmailAccount[];
}

const EmailInboxList: React.FC<EmailInboxListProps> = ({ onAccountSelect, accounts }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<EmailAccount[]>(accounts);
  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );

  useEffect(() => {
    setRows(accounts);
  }, [accounts]);

  const handleAccountClick = async (accountId: string) => {
    dispatch(resetMailboxes());
    dispatch(setSelectedAccount(accountId));
    const response = await dispatch(getAllMailBox(accountId)).unwrap();
    if (response.length > 0) {
      const firstMailbox = response[0];
      dispatch(setSelectedMailbox(firstMailbox._id));
      dispatch(
        getAllEmailThreads({
          accountId,
          page: 1,
          limit: 10,
        })
      );
    }
    if (onAccountSelect) {
      onAccountSelect();
    }
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery === "") {
      setRows(accounts);
      return;
    }

    const filteredData = accounts.filter(
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

  const selectedAccount = rows.find(account => account._id === selectedAccountId);
  const otherAccounts = rows.filter(account => account._id !== selectedAccountId);
  
  return (
    <EmailInboxListContainer>
      <EmailInboxHeading>
        <SearchBar style={{ maxWidth: "100%" }}>
          <Search />
          <input
            placeholder="Search Account"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchBar>
      </EmailInboxHeading>

      <AccountList className="popup-mode">
        {rows.length > 0 ? (
          <>
            {selectedAccount && (
              <AccountItem
                key={selectedAccount._id}
                onClick={() => handleAccountClick(selectedAccount._id)}
                data-selected={true}
              >
                <AccountAvatar>{selectedAccount.name[0]?.toUpperCase()}</AccountAvatar>
                <AccountDetails>
                  <strong style={{ fontSize: "12px" }}>{selectedAccount.name}</strong>
                  <div style={{ fontSize: "12px", fontWeight: "400" }}>{selectedAccount.email}</div>
                </AccountDetails>
              </AccountItem>
            )}

            {otherAccounts.length > 0 && (
              <>
                <AccountSelectorDivider>
                  <AccountSelectorText>
                    Select another account
                  </AccountSelectorText>
                </AccountSelectorDivider>
                
                {otherAccounts.map((account) => (
                  <AccountItem
                    key={account._id}
                    onClick={() => handleAccountClick(account._id)}
                    data-selected={false}
                  >
                    <AccountAvatar>{account.name[0]?.toUpperCase()}</AccountAvatar>
                    <AccountDetails>
                      <strong>{account.name}</strong>
                      <div>{account.email}</div>
                    </AccountDetails>
                  </AccountItem>
                ))}
              </>
            )}
          </>
        ) : (
          <NoAccount>No accounts found</NoAccount>
        )}
      </AccountList>
    </EmailInboxListContainer>
  );
};

export default EmailInboxList;
