import React from 'react'
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import Input from '@Components/atoms/Input';

const SelectInput = ({ Errors, Label, Name, Register, selectValue, setSelectValue, options, ...rest }) => {
    return (
        <Input
            Register={Register}
            select
            label="Currency"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            variant="filled"
            Errors={Errors}
            {...rest}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Input>
    )
}

SelectInput.propTypes = {
    Errors: PropTypes.object,
    Label: PropTypes.string,
    Name: PropTypes.string,
    Register: PropTypes.any,
    selectValue: PropTypes.any,
    setSelectValue: PropTypes.func,
    options: PropTypes.array
}

export default SelectInput
