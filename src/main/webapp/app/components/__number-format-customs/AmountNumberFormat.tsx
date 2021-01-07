import React from 'react';
import { NumberFormatProps } from './NumberFormatProps';
import NumberFormat from 'react-number-format';

export default function AmountNumberFormat(props: NumberFormatProps) {
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
			}}
			placeholder='00.00'
			thousandSeparator
			isNumericString
		/>
	);
}
