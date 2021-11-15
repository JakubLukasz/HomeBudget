import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import Text from '@Components/atoms/Text';
import Icon from '@Components/atoms/Icon';

const AddButton = styled('button')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '@media screen and (min-width: 1024px)': {
        order: -1
    }
})

const IconBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    padding: '1rem',
    marginBottom: '0.5rem',
}));

const ButtonText = styled(Text)({
    fontWeight: 600,
})

const RoundButton = ({ className, onClick, text, icon }) => {

    return (
        <AddButton className={className} onClick={onClick}>
            <IconBox>
                <Icon type={icon} />
            </IconBox>
            <ButtonText variant="p1">{text}</ButtonText>
        </AddButton>
    );
};

RoundButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
    icon: PropTypes.string,
}

export default RoundButton;
