import styled from "@emotion/styled";

interface CustomDialogFooterProps {
  justifyContent?: string;
}

export const Button = styled.button`
  font-weight: 600;
  width: fit-content;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background: linear-gradient(
    135deg,
    var(--secondary) 0%,
    var(--secondary-dark) 100%
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
  width: fit-content;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: var(--text-white);
  background: linear-gradient(
    135deg,
    var(--secondary) 0%,
    var(--secondary-light) 100%
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
  border: 1px solid var(--border-color);

  &:hover {
    background: var(--hover-color);
    color: var(--text-black);
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
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  color: var(--theme-color);
  background-color: var(--text-white);
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  box-shadow: var(--shadow-dark);

  // &:hover svg {
  //   color: var(--theme-color);
  //   fill: var(--theme-color);
  // }

  // &:hover {
  //   background: var(--hover-color);
  //   color: var(--theme-color);
  // }

  // &:hover .input {
  //   color: var(--theme-color);
  // }

  // &:active {
  //   background: var(--active-color);
  //   color: var(--theme-color);
  // }

  // &:active .input {
  //   color: var(--theme-color);
  // }
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

