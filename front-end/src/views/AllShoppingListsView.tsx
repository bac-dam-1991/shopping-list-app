import { Container, Typography, Stack, IconButton } from "@mui/material";
import {
  ShoppingListForm,
  ShoppingListFormId,
} from "../forms/ShoppingListForm";
import axios from "axios";
import { Modal } from "../components/Modal";
import { useEffect, useState, useCallback, MouseEventHandler } from "react";
import { ShoppingList, ShoppingListCard } from "../components/ShoppingListCard";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

type ModalIds = "add-shopping-list-modal";

export const AllShoppingListsView = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [modalToOpen, setModalToOpen] = useState<ModalIds | null>(null);

  const getAllShoppingLists = useCallback(async () => {
    try {
      const url = "http://localhost:3001/api/v1/shopping-lists";
      const response = await axios.get<ShoppingList[]>(url);
      setShoppingLists(response.data);
    } catch (error) {
      console.error((error as Error).message);
    }
  }, []);

  useEffect(() => {
    getAllShoppingLists();
  }, [getAllShoppingLists]);

  const closeAllModals: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setModalToOpen(null);
  };

  return (
    <Container>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ mb: 5 }} alignContent={"center"}>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Shopping Lists
          </Typography>
          <IconButton
            color="primary"
            onClick={() => setModalToOpen("add-shopping-list-modal")}
          >
            <AddCircleOutlineRoundedIcon />
          </IconButton>
        </Stack>
        <Modal
          title={"Add new shopping list"}
          open={modalToOpen === "add-shopping-list-modal"}
          onCancel={closeAllModals}
          onClose={closeAllModals}
          formId={ShoppingListFormId}
        >
          <ShoppingListForm
            formId={ShoppingListFormId}
            onFinish={async () => {
              await getAllShoppingLists();
              setModalToOpen(null);
            }}
          />
        </Modal>
        {shoppingLists.map((list) => {
          return (
            <ShoppingListCard
              key={list._id}
              data={list}
              onFinish={getAllShoppingLists}
            />
          );
        })}
      </Stack>
    </Container>
  );
};
