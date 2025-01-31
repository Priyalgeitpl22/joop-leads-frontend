import styled from "@emotion/styled";

export const SettingsContainer = styled.div`
  height: fit-content;  
  display: flex;
  align-items: center;
  gap:5rem;
`;

export const Section = styled.section`
  background: var(--surface);
  border-radius: 8px;
  padding: 10px;
  border: 1px solid var(--border);
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #35495c;
  margin-bottom: 16px;
  display: flex;
`;

export const ColorGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ColorOption = styled.button<{ color: string; isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => (props.isSelected ? "#ffffff" : "transparent")};
  outline: 3px solid ${(props) => (props.isSelected ? props.color : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* Smooth transition */
  transform: ${(props) => (props.isSelected ? "scale(1.1)" : "scale(1)")}; /* Slight scaling effect */
  box-shadow: ${(props) => (props.isSelected ? `0 0 10px ${props.color}` : "none")}; /* Glow effect */
`;


export const ColorInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #cfd9e5;
  border-radius: 4px;
  background: var(--surface);
  color: var(--text);
  width: 60px;
  margin-right: 12px;
  font-size: 14px;
`;

export const CheckAccessibility = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  color: #3e5164;
  cursor: pointer;
  background: none;
`;

export const ColorCheckBox = styled.input`
  width: 24px;
  height: 24px;;
  border: 2px solid #3e5164;
  cursor: pointer;
  background: blue;

  &:checked {
    background-color: red;
  }
  `;

  export const SaveButton = styled.button`
  font-weight: bold;
  padding: 8px 24px;
  position:absolute;
  border: none;
  border-radius: 6px;
  color: #fff;
  background-color: #7ed8d6;
  cursor: pointer;
  font-size: 16px;

  :hover {
    background-color: #7ed8d6;
    opacity: 0.8;
  }
`;
