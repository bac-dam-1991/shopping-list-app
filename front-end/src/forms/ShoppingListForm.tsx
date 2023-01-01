import { TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

export const ShoppingListFormId = "shopping-list-form-id";

export interface ShoppingListFormFields {
  name: string;
}

export interface ShoppingListFormProps {
  formId: string;
  onSubmit: (data: ShoppingListFormFields) => Promise<void>;
  loading?: boolean;
  defaultValues?: ShoppingListFormFields;
}

export const ShoppingListForm = ({
  onSubmit,
  formId,
  loading,
  defaultValues,
}: ShoppingListFormProps) => {
  const { register, handleSubmit } = useForm<ShoppingListFormFields>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          size="small"
          {...register("name")}
          disabled={loading}
        />
      </Stack>
    </form>
  );
};
