import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, withStyles, fade, InputBase, Select, MenuItem, OutlinedInput } from '@material-ui/core';

export interface IInputFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  multiline?: boolean;
  inputProps?: any;
  type?: string;
  adorment?: any;
  handleChange?: any;
  value?: any;
  isValid?: boolean;
  items?: Array<string>;
}

const inputStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    inputRoot: {
      '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
      },
    },
    invalidInput: {
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
      },
    },
    formControl: {
      margin: theme.spacing(1),
    },
  }),
);

export const SimpleInputField = (props: IInputFieldProps) => {
  const classes = inputStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel htmlFor="component-outlined">{props.isRequired ? props.label.concat(' *') : props.label}</InputLabel>
        <OutlinedInput
          id={props.id}
          value={props.value || ""}
          onChange={props.handleChange}
          className={props.isValid ? classes.inputRoot : classes.invalidInput}
          type={props.type}
          label={props.label}
          required={props.isRequired ? true : false}
          placeholder={props.placeholder}
          multiline={props.multiline ? true : false}
          rows={props.multiline ? 4 : 1}
          startAdornment={props.adorment}
        />
      </FormControl>
    </form>
  );
}

export const SelectInputField = (props: IInputFieldProps) => {
  const classes = inputStyles();

  return (
    <FormControl fullWidth variant="outlined" size="small" className={classes.formControl}>
      <InputLabel htmlFor="component-outlined">{props.label}</InputLabel>
      <Select
          id={props.id}
          label={props.label}
          className={props.isValid ? classes.inputRoot : classes.invalidInput}
          value={props.value}
          required={props.isRequired ? true : false}
          onChange={props.handleChange}>
        { props.items.map((item) =>
          <MenuItem key={item} value={item}>
            {(item.toLowerCase().replace('_', ' ')).charAt(0).toUpperCase() + (item.toLowerCase().replace('_', ' ')).slice(1)}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
