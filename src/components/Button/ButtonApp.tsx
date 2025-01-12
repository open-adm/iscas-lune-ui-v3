import { Button as ButtonMui } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { IconApp } from "../Icon/IconApp";

export interface propsButton {
  title?: string;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  type?: "submit" | "button" | "reset";
  fullWidth?: boolean;
  width?: string;
  maxWidth?: string;
  autoFocus?: boolean;
  loading?: boolean;
  backGroundColor?: string;
  backGroundColorHover?: string;
  height?: string;
  disabled?: boolean;
  children?: ReactNode;
  component?: string;
  tabIndex?: number;
  endIcon?: string;
}

export function Button(props: propsButton) {
  return (
    <ButtonMui
      {...props}
      onClick={(e) => {
        e.preventDefault();
        if (props.onClick) {
          props.onClick();
        }
      }}
      tabIndex={props.tabIndex}
      autoFocus={props.autoFocus}
      disabled={props.disabled || props.loading}
      variant={props.variant}
      type={props.type}
      fullWidth={props.fullWidth}
      sx={{
        height: props.height,
        maxWidth: props.maxWidth,
        width: props.width,
        backgroundColor: props.backGroundColor,
        "&:hover": {
          backgroundColor: props.backGroundColorHover,
        },
      }}
      endIcon={props.endIcon ? <IconApp icon={props.endIcon} /> : undefined}
    >
      {!props.loading ? props.title ?? "Continuar" : `Aguarde...`}
      {props.loading && (
        <CircularProgress sx={{ marginLeft: "10px" }} size={20} />
      )}
      {props.children}
    </ButtonMui>
  );
}
