import { Control, FieldValues, Path, useController } from "react-hook-form";

export type UseFieldInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

export const useFieldInput = <T extends FieldValues>({
  name,
  control,
}: UseFieldInputProps<T>) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control });

  return { value, invalid, errors, onChange, onBlur };
};
