import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  getAllMailBox,
  setSelectedAccount,
  resetMailboxes,
  setSelectedMailbox,
  getAllAccountMailBox,
  reloadAccountMailboxes,
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
  RefreshRoundedbutton,
} from "./EmailInboxList.styled";
import { fetchEmailAccount } from "../../../redux/slice/emailAccountSlice";
import { EmailAccount } from "../../Email-Campaign/NewCampaign/SetupCampaign/Interface";

const EmailInboxList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector((state: RootState) => state.emailInbox.accounts);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([])
  const { user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleAccountClick = async (accountId: string) => {
    dispatch(resetMailboxes());
    dispatch(setSelectedAccount(accountId));
    const response = await dispatch(getAllMailBox(accountId)).unwrap();
    if (response.length > 0) {
      const firstMailbox = response[0];
      dispatch(setSelectedMailbox(firstMailbox._id));
      dispatch(
        getAllAccountMailBox({
          accountId,
          mailBoxId: firstMailbox._id,
          page: 1,
          limit: 10,
        })
      );
    }
  };

  useEffect(() => {
    const getEmailAccounts = async () => {
      await getAllEmailAccounts();
    };
    console.log(loading);
    getEmailAccounts();
  }, []);

  const getAllEmailAccounts = async () => {
    try {
      setLoading(true);
      const data = await dispatch(
        fetchEmailAccount({ orgId: user?.orgId || "" })
      ).unwrap();
      setEmailAccounts(data);
      setRows(data);
    } catch (error) {
      console.error("Failed to fetch Account:", error);
    } finally {
      setLoading(false);
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

  const handleReload = async () => {
    if (!emailAccounts || emailAccounts.length === 0 || !selectedAccountId)
      return;

    try {
      setLoading(true);
      const res = await dispatch(
        reloadAccountMailboxes({ accountId: selectedAccountId })
      ).unwrap();
      console.log(res, "res");
      // if (res) {
      //   const fetchMessages = await dispatch(
      //     reloadAccountMessages({ accountId: selectedAccountId })
      //   );
      //   console.log(fetchMessages);
      // }
    } catch (error) {
      console.error("❌ Error while reloading account mailboxes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <EmailInboxListContainer>
      <EmailInboxHeading>
        {/* <EmailInboxListHeader>
          <HeaderTitle>Accounts</HeaderTitle>
        </EmailInboxListHeader> */}
        <SearchBar>
          <Search/>
          <input
            placeholder="Search Account"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchBar>
        <RefreshRoundedbutton onClick={handleReload} />
      </EmailInboxHeading>

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
            <NoAccount>No accounts found</NoAccount>
          )}
        </AccountList>
    
    </EmailInboxListContainer>
  );
};

export default EmailInboxList;
