import styled from "@emotion/styled";

export const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 56px 40px;
  width: 480px;
  cursor: pointer;

  border: 2px dashed #aeaeafff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  transition: all 0.25s ease-in-out;

  &:hover {
    border-color: #8b5cf6;
    background: #faf5ff;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.12);
  }

  .circle-icon {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background: #f3e8ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8b5cf6;
    margin-bottom: 12px;
  }
`;

export const Container = styled.div`
  width: 50%;
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableRow = styled.tr``;

export const TableHead = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  border-top: 1px solid #f3f4f6;
  color: #4b5563;
`;

export const FileLink = styled.a`
  color: var(--primary-dark);
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #2563eb;
  }
`;

export const DateText = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
`;

export const MoreOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MoreOptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;
  &:hover {
    background: #f3f4f6;
  }
`;

export const PopupMenu = styled.div`
  position: absolute;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  width: 160px;
  padding: 8px 0;
  z-index: 100;
  border: 1px solid #e5e7eb;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #f3f4f6;
    color: #1f2937;
  }
`;