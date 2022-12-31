import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingList } from "../components/ShoppingListCard";

export const ShoppingListView = () => {
  const { id } = useParams();
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const getAllShoppingLists = async () => {
      try {
        const url = `http://localhost:3001/api/v1/shopping-lists/${id}`;
        const response = await axios.get<ShoppingList>(url);
        setShoppingList(response.data);
      } catch (error) {
        console.error((error as Error).message);
      }
    };
    getAllShoppingLists();
  }, [id]);

  return (
    <Container>
      {shoppingList && (
        <Typography variant="h4" component="h1">
          {shoppingList.name}
        </Typography>
      )}
    </Container>
  );
};
