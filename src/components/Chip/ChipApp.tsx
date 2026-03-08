import { Chip } from "@mui/material";

interface propsChipApp {
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  label?: string;
}

export function ChipApp(props: propsChipApp) {
  return <Chip color={props.color} size="small" label={props.label} />;
}
