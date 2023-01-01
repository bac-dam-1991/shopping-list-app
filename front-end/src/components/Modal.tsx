import { LoadingButton } from "@mui/lab";
import {
  Box,
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
  formId?: string;
}

export const Modal = ({
  loading,
  onConfirm,
  onCancel,
  children,
  title,
  buttonLabels,
  formId,
  ...rest
}: ModalProps) => {
  return (
    <Dialog maxWidth="xs" fullWidth {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 1 }}>{children}</Box>
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button disabled={loading} onClick={onCancel}>
            {buttonLabels ? buttonLabels.cancelButton : "Cancel"}
          </Button>
        )}
        {(onConfirm || formId) && (
          <LoadingButton
            loading={loading}
            onClick={onConfirm}
            variant="contained"
            form={formId}
            type="submit"
          >
            {buttonLabels ? buttonLabels.confirmButton : "Confirm"}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};
