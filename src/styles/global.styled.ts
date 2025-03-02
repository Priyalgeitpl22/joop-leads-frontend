import styled from "@emotion/styled";

interface CustomDialogFooterProps {
  justifyContent?: string;
}

export const Button = styled.button`
  font-weight: semibold;
  width: fit-content;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background-color:var(--theme-color);
  cursor: pointer;
  font-size: 16px;  
  white-space: nowrap;
  box-shadow: var(--shadow-dark);

  &:hover {
    background: var(--hover-color);
    color: var(--text-white);
  }

  &:hover .input {
    color: var(--text-white);
  }

  &:active {
    background: var(--active-color);
    color: var(--text-white);
  }

  &:active .input {
    color: var(--text-white);
  }
`;

export const SecondaryButton = styled.button`
  font-weight: semibold;
  width: fit-content;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: var(--theme-color);
  background-color: var(--text-white);
  cursor: pointer;
  font-size: 16px;  
  white-space: nowrap;
  box-shadow: var(--shadow-dark);

  &:hover {
    background: var(--hover-color);
    color: var(--text-white);
  }

  &:hover .input {
    color: var(--text-white);
  }

  &:active {
    background: var(--active-color);
    color: var(--text-white);
  }

  &:active .input {
    color: var(--text-white);
  }
`;

export const CustomDialogFooter = styled.div<CustomDialogFooterProps>`
  color: var(--theme-color);
  text-align: center;
  position: sticky;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  box-sizing: border-box;
  width: 100%;
  display: flex;
  padding: 16px;
  background: var(--background-secondary);
`;

export const CustomDialogHeader = styled.div`
  color: var(--theme-color);
  text-align: center;
  position: sticky;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  background: var(--background-secondary);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const CustomDialogContainer = styled.div`
  color: var(--theme-color);
  text-align: center;
  justify-content: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 16px;
  width: 100%;
  overflow: auto;
`
export const TitleBody = styled.input`
  border: 1px solid #e1e2ef;
  border-radius: 3px;
  min-height: 50px;
  width: 100%;
  outline: none; /* Removes default focus outline */
  box-shadow: none; /* Ensures no blue glow effect */
  padding: 10px;
  font-size: 16px;

  &:focus {
    border: 1px solid var(--border-color) !important; /* Optional: Customize focus border */
    outline: none !important;
    box-shadow: none !important;
  }

  &:focus-visible {
    border: 1px solid var(--border-color) !important;
    outline: none !important;
    box-shadow: none !important;
  }

  &:hover {
    background-color: inherit !important;
  }
`;
