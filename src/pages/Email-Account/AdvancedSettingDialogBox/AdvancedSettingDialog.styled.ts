import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const DialogContainer = styled.div`
  min-height: 450px;
  display: flex;
  flex-direction: column;
  background: #f7f9fc;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

export const TabPanel = styled(motion.div)`
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  justify-content: center;
`;

export const AvailabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .availability-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;
