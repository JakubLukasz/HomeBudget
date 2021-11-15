import React from 'react'
import PropTypes from 'prop-types';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';

import Input from '@Components/atoms/Input';

const DateInput = ({ Register, Label, dateValue, setDateValue }) => (
    <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
            label={Label}
            variant="filled"
            value={dateValue}
            inputFormat="YYYY-MM-DD"
            onChange={(value) => setDateValue(value)}
            renderInput={(params) => <Input Register={Register} {...params} />}
        />
    </LocalizationProvider>
)

DateInput.propTypes = {
    Register: PropTypes.any,
    Label: PropTypes.string,
    dateValue: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    setDateValue: PropTypes.func
}

export default DateInput
