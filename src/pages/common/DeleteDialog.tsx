import { Button, Dialog } from "../../components/common";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onClose,
  onConfirm,
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>

          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Processing..." : confirmText}
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
};

export default ConfirmDialog;
