import { Typography, Paper, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useState, MouseEvent, MouseEventHandler } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

export type ModalIds = "delete-shopping-list-modal";

export interface ShoppingList {
  _id: string;
  name: string;
  item: any[];
}

export interface ShoppingListCardProps {
  data: ShoppingList;
  onFinish: () => Promise<void>;
}

export const ShoppingListCard = ({ data, onFinish }: ShoppingListCardProps) => {
  const navigate = useNavigate();
  const [modalToOpen, setModalToOpen] = useState<ModalIds | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const closeAllModals: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setModalToOpen(null);
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const url = `http://localhost:3001/api/v1/shopping-lists/${data._id}`;
      await axios.delete<string>(url);
      await onFinish();
      closeAllModals(e);
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        cursor: "pointer",
        "&:hover": {
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
      onClick={() => navigate(data._id)}
    >
      <Stack direction="row" alignItems={"center"}>
        <Typography sx={{ flexGrow: 1 }}>{data.name}</Typography>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setModalToOpen("delete-shopping-list-modal");
          }}
        >
          <DeleteForeverRoundedIcon />
        </IconButton>
      </Stack>
      <Dialog
        open={modalToOpen === "delete-shopping-list-modal"}
        onClose={loading ? undefined : closeAllModals}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          Deleting this shopping list will delete all items within it. This is
          not reversible.
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={closeAllModals}>
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            onClick={handleDelete}
            variant="contained"
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
