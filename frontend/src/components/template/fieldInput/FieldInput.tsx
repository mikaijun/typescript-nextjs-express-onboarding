import { Input, InputProps } from "@chakra-ui/react";
import { FieldValues } from "react-hook-form";
import { useFieldInput, UseFieldInputProps } from "./FieldInput.hooks";
import { Field, FieldProps } from "@/components/ui/field";

type FieldInputProps<T extends FieldValues> = UseFieldInputProps<T> & {
  fieldProps?: FieldProps;
  inputProps?: InputProps;
};

export const FieldInput = <T extends FieldValues>({
  name,
  control,
  fieldProps,
  inputProps,
}: FieldInputProps<T>) => {
  const { value, invalid, errors, onChange, onBlur } = useFieldInput({
    name,
    control,
  });
  const errorMessage = errors[name]?.message as string | undefined;
  return (
    <Field
      errorText={errorMessage}
      invalid={invalid}
      label={name}
      {...fieldProps}
    >
      <Input
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value ?? ""}
        {...inputProps}
      />
    </Field>
  );
};
