import { lazy } from "react";
import { styled } from "@mui/material/styles";

const Button = lazy(() => import("@mui/material/Button"));
const TextField = lazy(() => import("@mui/material/TextField"));
const InputAdornment = lazy(() => import("@mui/material/InputAdornment"));

const Input = styled("input")({
  display: "none",
});

export default function ChooseFile({ accept, onChange, disabledSelectFile = false, ...props}) {
  return (
    <TextField
      {...props}
      variant="outlined"
      disabled={disabledSelectFile}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <label htmlFor={`contained-button-${props.id}`} >
              <Input accept={accept} id={`contained-button-${props.id}`} type="file" onChange={onChange} disabled={disabledSelectFile}/>
              <Button variant="contained" component="span" disabled={disabledSelectFile}>
                {`Choose ${props.label}`}
              </Button>
            </label>
          </InputAdornment>
        ),
        readOnly: true,
      }}
      fullWidth
    />
  );
}
