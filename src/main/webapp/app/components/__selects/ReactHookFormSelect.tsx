import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText, makeStyles } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		minWidth: '100%',
	},
}));

const ReactHookFormSelect = ({
	id,
  name,
	label,
	error=false,
  control,
  defaultValue,
	children,
	helperText,
  ...props
}) => {
	const classes = useStyles();
	
  const labelId = `${name}-label`;
  return (
    <FormControl variant="outlined" className={classes.formControl} {...props}>
      <InputLabel id={labelId} margin='dense'>{label}</InputLabel>
      <Controller
				id={id}
        as={
					<Select
						error={error}
						labelId={labelId}
						label={label}
						margin="dense"
					>
            {children}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
			{helperText && (
				<FormHelperText error={error}>{helperText}</FormHelperText>
			)}
    </FormControl>
  );
};

export default ReactHookFormSelect;
