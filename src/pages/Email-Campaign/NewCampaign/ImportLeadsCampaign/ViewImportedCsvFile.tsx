import { useState, useRef, useEffect } from "react";
import {
  Card,
  Container,
  FileLink,
  MenuItem,
  MoreButton,
  MoreOptionsContainer,
  PopupMenu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Title,
} from "./importLeads.styled";
import { Info, MoreHorizontal, Upload } from "lucide-react";
import DownloadCsvFileDialog from "./DownloadCsvfileDialog";
import React from "react";
import UploadLeadsDialog from "./UploadLeadsDialog";
import { formatDateTime } from "../../../../utils/utils";

interface ViewImportedCsvFileProps {
  csvFileDetails: any;
}

const ViewImportedCsvFile: React.FC<ViewImportedCsvFileProps> = ({
  csvFileDetails,
}) => {
  const [exportCsvDialog, setExportCsvDialog] = useState(false);
  const [showUploadedLeads, setShowUploadedLeads] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // const toggleMenu = () => {
  //   if (showMenu) {
  //     setShowMenu(false);
  //   } else {
  //     if (buttonRef.current) {
  //       const rect = buttonRef.current.getBoundingClientRect();
  //       setMenuPosition({
  //         top: rect.top,
  //         left: rect.right + 15,
  //       });
  //     }
  //     setShowMenu(true);
  //   }
  // }, [showUploadedLeads]);

  const toggleMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.top,
          left: rect.right + 15,
        });
      }
      setShowMenu(true);
    }
  };

  const showUploadLeads = () => {
    setShowUploadedLeads(true);
  };

  const handleExportCsv = () => {
    setExportCsvDialog(true);
  };

  const goToNextStep = () => {
  };

  return (
    <Container>
      <Title>Previously Uploaded Leads</Title>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead style={{ textAlign: "right" }}>
                Imported Leads Count
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <FileLink href="#">{csvFileDetails.fileName}</FileLink>
                {formatDateTime(csvFileDetails?.uploadedAt)}
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {csvFileDetails?.uploadCounts?.uploadedCount}
              </TableCell>
              <TableCell>
                <MoreOptionsContainer>
                  <MoreButton ref={buttonRef} onClick={toggleMenu}>
                    <MoreHorizontal />
                  </MoreButton>
                  {showMenu && (
                    <PopupMenu
                      ref={menuRef}
                      style={{ top: menuPosition.top, left: menuPosition.left }}
                    >
                      <MenuItem onClick={() => setExportCsvDialog(true)}>
                        <Upload size={14} /> Export CSV
                      </MenuItem>
                      <MenuItem onClick={() => setShowUploadedLeads(true)}>
                        <Info size={14} /> View Details
                      </MenuItem>
                    </PopupMenu>
                  )}
                </MoreOptionsContainer>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <UploadLeadsDialog
        open={showUploadedLeads}
        uploadCounts={csvFileDetails?.uploadCounts}
        onClose={() => setShowUploadedLeads(false)}
      />
      <DownloadCsvFileDialog
        open={exportCsvDialog}
        onClose={() => setExportCsvDialog(false)}
        fileUrl={csvFileDetails.csv_file}
      />
    </Container>
  );
};

export default ViewImportedCsvFile;
