import './radio.scss'
import React from 'react';

export interface IBRadioProps {
  id?: string,
  name?: string,
  label?: string,
  value?: any
  checked?: boolean,
  disabled?: boolean
  onChange?: any,
}

export const defaultValue: Readonly<IBRadioProps> = {
  disabled: false,
  checked: false,
};

export const BRadio = (props: IBRadioProps) => {
  return (
    <div className="radio">
      <input
        id={props.id}
        name={props.name}
        type="radio"
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
      />
      <label
        htmlFor={props.id}
        className="radio-label"
      >
        {props.label}
      </label>
    </div>
  );
}
