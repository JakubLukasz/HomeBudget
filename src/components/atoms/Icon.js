import React from 'react'
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpenseIcon from '@mui/icons-material/Assignment';
import StatisticIcon from '@mui/icons-material/Equalizer';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import FoodIcon from '@mui/icons-material/RestaurantMenu';
import FeesIcon from '@mui/icons-material/AttachMoney';
import ShoppingIcon from '@mui/icons-material/ShoppingBag';
import PaydayIcon from '@mui/icons-material/LocalAtm';
import EntertainmentIcon from '@mui/icons-material/Person';
import OtherIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Cached';

const chooseIcon = (type, props) => {
    switch (type) {
        case 'Home':
            return <HomeIcon {...props} />;
        case 'Logout':
            return <LogoutIcon {...props} />;
        case 'Expense':
            return <ExpenseIcon {...props} />;
        case 'Statistic':
            return <StatisticIcon {...props} />;
        case 'Car':
            return <CarIcon {...props} />;
        case 'Food':
            return <FoodIcon {...props} />;
        case 'Fees':
            return <FeesIcon {...props} />;
        case 'Shopping':
            return <ShoppingIcon {...props} />;
        case 'Payday':
            return <PaydayIcon {...props} />;
        case 'Entertainment':
            return <EntertainmentIcon {...props} />;
        case 'Other':
            return <OtherIcon {...props} />;
        case 'Close':
            return <CloseIcon {...props} />;
        case 'Transaction':
            return <TransactionIcon {...props} />
        case 'Delete':
            return <DeleteIcon {...props} />
        case 'Person':
            return <PersonIcon {...props} />
        case 'Add':
            return <AddIcon {...props} />
        case 'Update':
            return <UpdateIcon {...props} />
    }
}

const Icon = ({ type, ...props }) => {
    return (
        <>
            {chooseIcon(type, props)}
        </>
    )
}

Icon.propTypes = {
    type: PropTypes.string
}

export default Icon
