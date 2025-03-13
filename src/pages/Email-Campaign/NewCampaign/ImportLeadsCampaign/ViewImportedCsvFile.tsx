import { useState, useRef } from "react";
import { ImportedLeadsData } from "../NewCampaign";
import { Card, Container, FileLink, MenuItem, MoreButton, MoreOptionsContainer, PopupMenu, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Title } from "./importLeads.styled";
import { Info, MoreHorizontal, Upload } from "lucide-react";
import DownloadCsvFileDialog from "./DownloadCsvfileDialog";
import React from "react";

interface ViewImportedCsvFileProps {
  handleLeadsData: (data: ImportedLeadsData) => void;
  handleCSVUpload: (data: any) => void;
  saveCSVSetting: (data: any) => void;
  setIsNextDisabled: (status: boolean) => void;
}

const ViewImportedCsvFile: React.FC<ViewImportedCsvFileProps> = () => {
  const [exportCsvDialog, setExportCsvDialog] = React.useState(false);
  
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [uploadLeads, setUploadLeads] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleUploadedLeads = () => {
    setUploadLeads(true);
    setShowMenu(false);
  };

  console.log("upload lead", uploadLeads)
  const handleExportCsv = () => {
    setExportCsvDialog(true)
  }

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
                <FileLink href="#">
                  CSV file
                </FileLink>
                Dateee
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>100</TableCell>
              <MoreOptionsContainer ref={menuRef}>
                <MoreButton onClick={toggleMenu}>
                  <MoreHorizontal />
                </MoreButton>
                {showMenu && (
                  <PopupMenu>
                    <MenuItem onClick={handleExportCsv}>
                      <Upload size={14} /> Export CSV
                    </MenuItem>
                    <MenuItem onClick={handleUploadedLeads}>
                      <Info size={14} /> View Details
                    </MenuItem>
                    {/* <UploadLeadsDialog
                      // open={uploadleads}
                      uploadCounts={uploadCounts}
                      onClose={() => {
                        setUploadLeads(false);
                        goToNextStep();
                      }}
                    /> */}
                    <DownloadCsvFileDialog
                      open={exportCsvDialog}
                      onClose={() => setExportCsvDialog(false)}
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
