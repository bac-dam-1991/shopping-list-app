import { Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface ShoppingList {
  _id: string;
  name: string;
}

export interface ShoppingListCardProps {
  data: ShoppingList;
}

export const ShoppingListCard = ({ data }: ShoppingListCardProps) => {
  const navigate = useNavigate();

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
      <Typography>{data.name}</Typography>
    </Paper>
  );
};
