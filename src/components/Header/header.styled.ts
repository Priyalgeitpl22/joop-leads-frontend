import styled from '@emotion/styled';

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  margin-right: auto;
  width: 300px;

  input {
    background: none;
    border: none;
    margin-left: 0.5rem;
    outline: none;
    color: #64748b;
    width: 100%;

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

export const NotificationBell = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
`;
export const ProfileIcon = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  width: 50px; 
  height: 50px; 
  opacity: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
    opacity: 0.8;
  }
`;