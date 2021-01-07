import React from 'react';
import { NumberFormatProps } from './NumberFormatProps';
import NumberFormat from 'react-number-format';

export default function ExpiryDateFormat(props: NumberFormatProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			} }
			format="##/##"
			placeholder="MM/YY"
			mask={['M', 'M', 'Y', 'Y']}
		/>
  );
}
