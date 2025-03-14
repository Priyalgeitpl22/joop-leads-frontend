import { useState, useRef, useEffect } from "react";
import { ImportedLeadsData } from "../NewCampaign";
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
import {
  formatDate,
  formatDateTime,
  formatTimestamp,
} from "../../../../utils/utils";
import UploadLeadsDialog from "./UploadLeadsDialog";

interface ViewImportedCsvFileProps {
  csvFileDetails: any;
}

const ViewImportedCsvFile: React.FC<ViewImportedCsvFileProps> = ({
  csvFileDetails,
}) => {
  const [exportCsvDialog, setExportCsvDialog] = React.useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showUploadedLeads, setShowUploadedLeads] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  // ✅ Ensure the modal opens immediately after state update
  useEffect(() => {
    if (showUploadedLeads) {
      setShowUploadedLeads(true);
    }
  }, [showUploadedLeads]);

  const showUploadLeads = () => {
    setShowUploadedLeads(true);
  };

  const handleExportCsv = () => {
    setExportCsvDialog(true);
  };

  const goToNextStep = () => {
    debugger;
  };

  return (
    <Container>
      <Title>Previously Uploads Leads</Title>
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
              <MoreOptionsContainer ref={menuRef}>
                <MoreButton onClick={toggleMenu}>
                  <MoreHorizontal />
                </MoreButton>
                {showMenu && (
                  <PopupMenu>
                    <MenuItem onClick={handleExportCsv}>
                      <Upload size={14} /> Export CSV
                    </MenuItem>
                    <MenuItem onClick={showUploadLeads}>
                      <Info size={14} /> View Details
                    </MenuItem>
                    <UploadLeadsDialog
                      open={showUploadedLeads}
                      uploadCounts={csvFileDetails?.uploadCounts}
                      onClose={() => {
                        setShowUploadedLeads(false);
                        goToNextStep();
                      }}
                    />
                    <DownloadCsvFileDialog
                      open={exportCsvDialog}
                      onClose={() => setExportCsvDialog(false)}
                      fileUrl={csvFileDetails.csv_file}
                    />
                  </PopupMenu>
                )}
              </MoreOptionsContainer>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default ViewImportedCsvFile;
