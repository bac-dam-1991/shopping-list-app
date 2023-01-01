import { Container, Typography, Stack, IconButton } from "@mui/material";
import {
  ShoppingListForm,
  ShoppingListFormId,
  ShoppingListFormFields,
} from "../forms/ShoppingListForm";
import axios, { AxiosError } from "axios";
import { Modal } from "../components/Modal";
import { useEffect, useState, useCallback, MouseEventHandler } from "react";
import { ShoppingList, ShoppingListCard } from "../components/ShoppingListCard";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useSnackbar } from "notistack";
import { extractErrorMessage } from "../apis";

type ModalIds = "add-shopping-list-modal" | "edit-shopping-list-modal";

export const AllShoppingListsView = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [modalToOpen, setModalToOpen] = useState<ModalIds | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedShoppingList, setSelectedShoppingList] =
    useState<ShoppingList | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const getAllShoppingLists = useCallback(async () => {
    try {
      const url = "http://localhost:3001/api/v1/shopping-lists";
      const response = await axios.get<ShoppingList[]>(url);
      setShoppingLists(response.data);
    } catch (error) {
      const message = extractErrorMessage(error);
      enqueueSnackbar(message, { variant: "error" });
    }
  }, []);

  useEffect(() => {
    getAllShoppingLists();
  }, [getAllShoppingLists]);

  const closeAllModals: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setModalToOpen(null);
  };

  const addShoppingList = async (data: ShoppingListFormFields) => {
    try {
      setLoading(true);
      const url = "http://localhost:3001/api/v1/shopping-lists";
      await axios.post<ShoppingList>(url, data);
      await getAllShoppingLists();
      setModalToOpen(null);
    } catch (error) {
      const message = extractErrorMessage(error);
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const editShoppingList = async (data: ShoppingListFormFields) => {
    if (!selectedShoppingList) {
      return;
    }
    try {
      setLoading(true);
      const url = `http://localhost:3001/api/v1/shopping-lists/${selectedShoppingList._id}`;
      await axios.put<ShoppingList>(url, data);
      await getAllShoppingLists();
      setModalToOpen(null);
      setSelectedShoppingList(null);
    } catch (error) {
      const message = extractErrorMessage(error);
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setLoading(false);
    }
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
            onSubmit={addShoppingList}
            loading={loading}
          />
        </Modal>
        <Modal
          title={"Edit shopping list"}
          open={modalToOpen === "edit-shopping-list-modal"}
          onCancel={closeAllModals}
          onClose={closeAllModals}
          formId={ShoppingListFormId}
        >
          <ShoppingListForm
            formId={ShoppingListFormId}
            onSubmit={editShoppingList}
            loading={loading}
            defaultValues={{
              name: selectedShoppingList ? selectedShoppingList.name : "",
            }}
          />
        </Modal>
        {shoppingLists.map((list) => {
          return (
            <ShoppingListCard
              key={list._id}
              data={list}
              onFinish={getAllShoppingLists}
              onEdit={() => {
                setModalToOpen("edit-shopping-list-modal");
                setSelectedShoppingList(list);
              }}
            />
          );
        })}
      </Stack>
    </Container>
  );
};
