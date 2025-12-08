import { Box, Button, styled, Typography } from "@mui/material";

export const SubscriptionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

export const PlansContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

export const SubscriptionCardContainer = styled(Box)<{ isSelected?: boolean }>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: var(--theme-background-light);
  border: 0.5px solid #00000033;
  border-radius: 20px;
  box-shadow: 0px 1px 5px 1px #00000040;
  box-sizing: border-box;
  gap: 24px;
  transition: ${props => props.isSelected ? "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out" : "transform 0.3s ease-in-out"};
  cursor: pointer;
  // background-color: ${(props) => (props.isSelected ? "var(--primary-selected)" : "var(--theme-background-light)")};
  transform: ${props => props.isSelected ? "scale(1.05)" : "scale(1)"};

  &:selected {
    transform: scale(1.05);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const SubscriptionCardHeader = styled(Box)`
  display: flex;
  height: 40px;
  width: 100%;
  gap: 0.5rem;
  background: var(--primary-gradient);
  color: var(--text-white);
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
`;

export const SubscriptionTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  color: var(--theme-background-light);
`;

export const SubscriptionSubtitle = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  margin: 0px;
`;

export const SubscriptionPrice = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  margin: 0px;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #7d7b7b;
  }
`;

export const SubscriptionFeatures = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
  line-height: 16px;

  p {
    color: #000000;
    font-weight: 400;
    font-size: 12px;
    margin: 0px;
  }

  img {
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }
`;

export const SubscriptionFeature = styled(Typography)`
  font-weight: 400;
  font-size: 12px;
  font-weight: 400;
  color: #000000;
`;

export const GetStartedButton = styled(Button)`
  font-weight: 600;
  height: 32px;
  width: 100%;
  max-width: 500px;
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

  &:disabled {
    background: var(--input-disabled-text);
    color: var(--text-white);
    cursor: not-allowed;
  }
`;

export const SubscriptionCardBody = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 12px;
  box-sizing: border-box;
`;