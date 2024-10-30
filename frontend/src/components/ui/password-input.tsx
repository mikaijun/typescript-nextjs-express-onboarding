"use client";

import type {
  ButtonProps,
  GroupProps,
  InputProps,
  StackProps,
} from "@chakra-ui/react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  Stack,
  mergeRefs,
  useControllableState,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { InputGroup } from "./input-group";

export interface PasswordVisibilityProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode };
}

export interface PasswordInputProps
  extends InputProps,
    PasswordVisibilityProps {
  rootProps?: GroupProps;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      ...rest
    } = props;

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <InputGroup
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            onPointerDown={(e) => {
              if (rest.disabled) return;
              if (e.button !== 0) return;
              e.preventDefault();
              setVisible(!visible);
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        width="full"
        {...rootProps}
      >
        <Input
          {...rest}
          ref={mergeRefs(ref, inputRef)}
          type={visible ? "text" : "password"}
        />
      </InputGroup>
    );
  },
);

const VisibilityTrigger = forwardRef<HTMLButtonElement, ButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        aria-label="Toggle password visibility"
        aspectRatio="square"
        height="calc(100% - {spacing.2})"
        me="-2"
        ref={ref}
        size="sm"
        tabIndex={-1}
        variant="ghost"
        {...props}
      />
    );
  },
);

interface PasswordStrengthMeterProps extends StackProps {
  max?: number;
  value: number;
}

export const PasswordStrengthMeter = forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(function PasswordStrengthMeter(props, ref) {
  const { max = 4, value, ...rest } = props;

  const percent = (value / max) * 100;
  const { label, colorPalette } = getColorPalette(percent);

  return (
    <Stack align="flex-end" gap="1" ref={ref} {...rest}>
      <HStack ref={ref} width="full" {...rest}>
        {Array.from({ length: max }).map((_, index) => (
          <Box
            _selected={{
              colorPalette,
              layerStyle: "fill.solid",
            }}
            colorPalette="gray"
            data-selected={index < value ? "" : undefined}
            flex="1"
            height="1"
            key={index}
            layerStyle="fill.subtle"
            rounded="sm"
          />
        ))}
      </HStack>
      {label && <HStack textStyle="xs">{label}</HStack>}
    </Stack>
  );
});

function getColorPalette(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: "Low", colorPalette: "red" };
    case percent < 66:
      return { label: "Medium", colorPalette: "orange" };
    default:
      return { label: "High", colorPalette: "green" };
  }
}