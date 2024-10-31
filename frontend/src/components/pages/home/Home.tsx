"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@chakra-ui/react";
import { Users } from "../../../../schema/Users";
import { FieldInput } from "@/components/template/fieldInput";

const REQUIRED_MESSAGE = "必須項目です";
const NAME_MAX_LENGTH_MESSAGE = "20文字以内で入力してください";
const EMAIL_MESSAGE = "メールアドレスの形式で入力してください";
const PASSWORD_MIN_LENGTH_MESSAGE = "パスワードは8文字以上で入力してください";

const schema = z.object({
  name: z
    .string({
      invalid_type_error: REQUIRED_MESSAGE,
      required_error: REQUIRED_MESSAGE,
    })
    .max(20, NAME_MAX_LENGTH_MESSAGE),
  email: z
    .string({
      invalid_type_error: REQUIRED_MESSAGE,
      required_error: REQUIRED_MESSAGE,
    })
    .email(EMAIL_MESSAGE),
  password: z
    .string({
      invalid_type_error: REQUIRED_MESSAGE,
      required_error: REQUIRED_MESSAGE,
    })
    .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
});

type UseFormProps = {
  name: string;
  email: string;
  password: string;
};

export const Home = () => {
  const { control, handleSubmit } = useForm<UseFormProps>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: UseFormProps) => {
    const users = new Users({ baseUrl: "http://localhost:8080" });
    await users.createUser({ ...data });
  };

  return (
    <Flex direction="column" gap="32px" padding="16px">
      <FieldInput
        control={control}
        inputProps={{ width: "400px" }}
        name="name"
      />
      <FieldInput
        control={control}
        inputProps={{ width: "400px" }}
        name="email"
      />
      <FieldInput
        control={control}
        inputProps={{ width: "400px" }}
        name="password"
      />
      <Button onClick={handleSubmit(onSubmit)} width="200px">
        送信
      </Button>
    </Flex>
  );
};
