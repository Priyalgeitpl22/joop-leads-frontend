import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const DialogContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;

export const TabPanel = styled(motion.div)`
  padding: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const AvailabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;

  .availability-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;
