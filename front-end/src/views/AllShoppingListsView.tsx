import { Container, Typography } from "@mui/material";
import { ShoppingListForm } from "../forms/ShoppingListForm";

export const AllShoppingListsView = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ mb: 5 }}>
        Shopping Lists
      </Typography>
      <ShoppingListForm />
    </Container>
  );
};
