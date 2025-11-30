import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
interface CustomDialogFooterProps {
  justifyContent?: string;
}

export const Button = styled.button`
  font-weight: 600;
  height: 32px;
  width: fit-content;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background: linear-gradient(
    135deg,
    var(--secondary) 0%,
    var(--secondary-dark) 100%
  );
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  transition: 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(
      135deg,
      var(--secondary) 0%,
      var(--secondary-light) 100%
    );
    color: white;
  }

  &:active {
    background: var(--secondary);
    color: var(--text-white);
  }
`;
export const PrimaryButton = styled.button`
  font-weight: 600;
  width: fit-content;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  transition: 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
    color: white;
  }

  &:active {
    background: var(--primary);
    color: var(--text-white);
  }
`;
export const ButtonDisabled = styled.button`
  font-weight: 600;
  height: 32px;
  width: fit-content;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background: linear-gradient(
    135deg,
    var(--text-secondary) 0%,
    var(--text-light) 100%
  );
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  transition: 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(
    135deg,
    var(--secondary) 0%,
    var(--secondary-light) 100%
  );
    color: white;
  }

  &:active {
    background: var(--secondary);
    color: var(--text-white);
  }
`;
export const PrimaryButtonDisabled = styled.button`
  font-weight: 600;
  width: fit-content;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  transition: 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
    color: white;
  }

  &:active {
    background: var(--primary);
    color: var(--text-white);
  }
`;
export const SecondaryButton = styled.button`
  font-weight: 600;
  height: 32px;
  width: fit-content;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background: linear-gradient(
    135deg,
    var(--secondary) 0%,
    var(--secondary-dark) 100%
  );
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: linear-gradient(
      135deg,
       var(--secondary-light) 0%,
       var(--secondary-dark) 100%
    );
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background: var(--secondary);
    color: var(--text-white);
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:hover .input {
    color: var(--text-white);
  }

  &:active .input {
    color: var(--text-white);
  }
`;

export const IconsButton = styled.button`
  font-weight: semibold;
  width: fit-content;
  padding: 2px 8px;
  border: none;
  border-radius: 6px;
  color: var(--theme-color);
  background-color: var(--text-white);
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  box-shadow: var(--shadow-dark);
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
  border-radius: 0px 0px 10px 10px;
  background: var(--background-head);
`;
export const CustomDialogHeader = styled.div`
  color: var(--theme-color);
  text-align: center;
  position: sticky;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  background: var(--background-head);
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
  // overflow: auto;
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
export const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  background-color: white;
  padding: 10px;
  height: 100%;
  overflow-x: hidden;
  
  flex-direction: column;
  border: 1px solid var(--border-grey);
  border-radius: 10px;  
  justify-content: space-between;
`;

export const SectionFooter = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  justify-content: flex-end;
  padding: 10px;
  background: var(--background-light);
  border-radius: 0px 0px 10px 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  background: var(--background-light);

  svg {
    height: 20px;
    width: 20px;
  }
`;

export const FilterIcon = styled(IconButton)`
  height: 32px;
  background: var(--background-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  padding: 10px;
`;

export const ReloadButton = styled(IconButton)`
  height: 32px;
  background: none;
  color: var(--primary-dark);
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: var(--background-color);
    color: var(--primary-dark);
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;