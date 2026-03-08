import { propsFormRow } from "@/types/Form";
import { Grid } from "@mui/material";

export function FormItemRow(props: propsFormRow) {
  return (
    <Grid
      size={{ xs: props.xs, sm: props.sm, md: props.md }}
      sx={{ marginTop: props.marginTop }}
    >
      {props.children}
    </Grid>
  );
}
