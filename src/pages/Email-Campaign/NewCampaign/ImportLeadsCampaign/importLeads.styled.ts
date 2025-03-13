import styled from "@emotion/styled";

export const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--background-light);
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 0px 0px;
  display: flex;
  gap: 20px;
  min-width: 400px;
  cursor: pointer;
`;

export const Container = styled.div`
  width: 50%;
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: #f7f8fa;
`;

export const TableRow = styled.tr``;

export const TableHead = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #666;
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  border-top: 1px solid #eee;
`;

export const FileLink = styled.a`
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateText = styled.p`
  font-size: 12px;
  color: #666;
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
//   position: absolute;
`;

export const MoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

// export const PopupMenu = styled.div`
// //   position: absolute;
//   right: 20;
//   top: 30px;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   width: 160px;
//   padding: 8px 0;
//   z-index: 100;
// `;

export const PopupMenu = styled.div`
//   position: absolute;
  left: 30px; /* Shift it to the right */
  top: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 160px;
  padding: 8px 0;
  z-index: 100;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;