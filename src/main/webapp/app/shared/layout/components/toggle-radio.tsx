import './toggle-radio.scss'
import React from 'react';

export interface IBToggleRadioProps {
  id?: string,
  name?: string,
  leftLabel?: string,
  rightLabel?: string,
  leftValue?: any
  rightValue?: any,
  leftChecked?: any,
  rightChecked?: any
  disabled?: boolean
  onChange?: any,
}

export const defaultValue: Readonly<IBToggleRadioProps> = {
  disabled: false,
  leftChecked: false,
  rightChecked: false
};

export const BToggleRadio = (props: IBToggleRadioProps) => {
  return (
      <div className="toggle">
        <input type="radio" name={props.name} value={props.leftValue} id="left" checked={props.leftChecked} />
        <label htmlFor="left">{props.leftLabel}</label>
        <input type="radio" name={props.name} value={props.rightValue} id="right" checked={props.rightChecked} />
        <label htmlFor="right">{props.rightLabel}</label>
      </div>
  );

}
