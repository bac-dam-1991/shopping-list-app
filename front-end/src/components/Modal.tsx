import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { MouseEventHandler } from "react";

export interface ModalProps extends DialogProps {
  loading?: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  buttonLabels?: { cancelButton: string; confirmButton: string };
}

export const Modal = ({
  loading,
  onConfirm,
  onCancel,
  children,
  title,
  buttonLabels,
  ...rest
}: ModalProps) => {
  return (
    <Dialog {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {onCancel && (
          <Button disabled={loading} onClick={onCancel}>
            {buttonLabels ? buttonLabels.cancelButton : "Cancel"}
          </Button>
        )}
        {onConfirm && (
          <LoadingButton
            loading={loading}
            onClick={onConfirm}
            variant="contained"
          >
            {buttonLabels ? buttonLabels.confirmButton : "Confirm"}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};
