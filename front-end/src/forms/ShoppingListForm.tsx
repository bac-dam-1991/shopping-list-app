import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

interface ShoppingListFormFields {
  name: string;
}

export const ShoppingListForm = () => {
  const { register, handleSubmit } = useForm<ShoppingListFormFields>();

  const onSubmit = (formFields: ShoppingListFormFields) => {
    console.log(formFields);
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
        <Button variant="contained" fullWidth type="submit">
          Add
        </Button>
      </Stack>
    </form>
  );
};
