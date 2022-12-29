import { Container, Typography } from "@mui/material";
import { ShoppingListForm } from "../forms/ShoppingListForm";
import axios from "axios";
import { useEffect, useState } from "react";

interface ShoppingList {
  _id: string;
  name: string;
}

export const AllShoppingListsView = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  useEffect(() => {
    const getAllShoppingLists = async () => {
      try {
        const url = "http://localhost:3001/api/v1/shopping-lists";
        const response = await axios.get<ShoppingList[]>(url);
        setShoppingLists(response.data);
      } catch (error) {
        console.error((error as Error).message);
      }
    };
    getAllShoppingLists();
  }, []);

  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ mb: 5 }}>
        Shopping Lists
      </Typography>
      <ShoppingListForm />
      {shoppingLists.map((list) => {
        return <Typography key={list._id}>{list.name}</Typography>;
      })}
    </Container>
  );
};
