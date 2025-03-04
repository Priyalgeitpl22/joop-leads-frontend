import styled from '@emotion/styled';

export const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    padding: 12px;
    border: 1px solid var(--border-color);
    background-color: white;
    border-radius: 5px;
    flex-grow: 1;
    width: 100%;
    max-width: 350px;
    gap: 10px;
    height: 42px;

  input {
    background: none;
    border: none;
    outline: none;
    color: var(--theme-color);
    width: 100%;

    &::placeholder {
      color: #94a3b8;
    }
  }
`;
export const NotificationBell = styled.button`
  background: none;
  border: none;
  color: var(--theme-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: var(--background-color)
    color: var(--background-light);
  }
`;
export const ProfileIcon = styled.button`
  background: none;
  border: none;
  color: var(--theme-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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
    background-color: var(--background-color)
    color: var(--background-light);
    opacity: 0.8;
  }
`;
export const UIContainer = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  background-color: var(--background-color)
  border-radius: 0.5rem;
  flex: none;
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const AppTitle = styled.p`
  margin: 0 !important;
  font-size: 26px;
  font-weight: 600;
  align-self: end;
  color: var(--theme-color-light);
`
export const AppSubtitle = styled.p`
  margin: 0 !important;
  font-size: 12px;
  align-self: start;
  align-item: center;
`

export const TitleContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  text-align: left;
`