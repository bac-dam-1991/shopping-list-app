import { TextField, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ShoppingList } from "../components/ShoppingListCard";
import { useState } from "react";

interface ShoppingListFormFields {
  name: string;
}

export interface ShoppingListFormProps {
  onFinish: () => Promise<void>;
}

export const ShoppingListForm = ({ onFinish }: ShoppingListFormProps) => {
  const { register, handleSubmit, reset } = useForm<ShoppingListFormFields>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ShoppingListFormFields) => {
    try {
      setLoading(true);
      const url = "http://localhost:3001/api/v1/shopping-lists";
      await axios.post<ShoppingList>(url, data);
      await onFinish();
      reset();
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          size="small"
          {...register("name")}
        />
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
        >
          Add
        </LoadingButton>
      </Stack>
    </form>
  );
};
