import React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Ban, Mail, UserX } from 'lucide-react';
import { DialogOverlay, DialogContainer, DialogHeader, CloseButton, DialogContent, TotalBox, SummaryTitle, SummaryList, SummaryItem, DialogFooter, DoneButton } from './styled';

export interface UploadCounts {
  uploaded: number;
  duplicates: number;
  blocked: number;
  empty: number;
  invalid: number;
  unsubscribed: number;
}

interface UploadSuccessDialogProps {
  open: boolean;
  uploadCounts: UploadCounts;
  onClose: () => void;
}

const STATUS_ITEMS = [
  { key: 'duplicates', label: 'Duplicate Leads', Icon: AlertTriangle },
  { key: 'blocked', label: 'Blocked Email Count', Icon: Ban },
  { key: 'empty', label: 'Empty Email Count', Icon: Mail },
  { key: 'invalid', label: 'Invalid Email Count', Icon: AlertTriangle },
  { key: 'unsubscribed', label: 'Unsubscribed Leads', Icon: UserX },
];

export const UploadSuccessDialog: React.FC<UploadSuccessDialogProps> = ({
  open,
  uploadCounts,
  onClose,
}) => {
  if (!open) return null;

  const isSuccess = (uploadCounts?.uploaded || 0) > 0;

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader $success={isSuccess}>
          <div className="title-section">
            {isSuccess ? <CheckCircle size={24} /> : <XCircle size={24} />}
            <h3>{isSuccess ? 'Leads Imported Successfully' : 'No Leads Imported'}</h3>
          </div>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>

        <DialogContent>
          <TotalBox>
            <span className="label">Total Uploaded Contacts</span>
            <span className="count">{uploadCounts?.uploaded || 0}</span>
          </TotalBox>

          <SummaryTitle>Import Summary</SummaryTitle>

          <SummaryList>
            {STATUS_ITEMS.map((item) => {
              const Icon = item.Icon;
              const count = uploadCounts?.[item.key as keyof typeof uploadCounts] || 0;

              return (
                <SummaryItem key={item.key}>
                  <div className="label-section">
                    <div className="icon-box">
                      <Icon size={18} />
                    </div>
                    <span className="label">{item.label}</span>
                  </div>
                  <span className="count">{count}</span>
                </SummaryItem>
              );
            })}
          </SummaryList>
        </DialogContent>

        <DialogFooter>
          <DoneButton onClick={onClose}>Done</DoneButton>
        </DialogFooter>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default UploadSuccessDialog;

