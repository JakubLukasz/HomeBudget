import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import ExpenseIcon from '@mui/icons-material/Assignment'
import StatisticIcon from '@mui/icons-material/Equalizer'
import CarIcon from '@mui/icons-material/DirectionsCarFilled'
import FoodIcon from '@mui/icons-material/RestaurantMenu'
import FeesIcon from '@mui/icons-material/AttachMoney'
import ShoppingIcon from '@mui/icons-material/ShoppingBag'
import PaydayIcon from '@mui/icons-material/LocalAtm'
import EntertainmentIcon from '@mui/icons-material/Person'
import OtherIcon from '@mui/icons-material/Circle'
import CloseIcon from '@mui/icons-material/Close'
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import UpdateIcon from '@mui/icons-material/Cached'

export const monthNames = [
  {
    id: '01',
    value: 'Januarssss',
  },
  {
    id: '02',
    value: 'February',
  },
  {
    id: '03',
    value: 'March',
  },
  {
    id: '04',
    value: 'April',
  },
  {
    id: '05',
    value: 'May',
  },
  {
    id: '06',
    value: 'June',
  },
  {
    id: '07',
    value: 'July',
  },
  {
    id: '08',
    value: 'August',
  },
  {
    id: '09',
    value: 'September',
  },
  {
    id: '10',
    value: 'October',
  },
  {
    id: '11',
    value: 'November',
  },
  {
    id: '12',
    value: 'December',
  },
]

export const categories = [
  {
    name: 'Food',
    icon: FoodIcon,
    list: ['Groceries', 'Bar, Cafe', 'Restaurant'],
  },
  {
    name: 'Car',
    icon: CarIcon,
    list: ['Car', 'Car Insurance', 'Car Repair', 'Car Leasing', 'Parking'],
  },
  {
    name: 'Home',
    icon: HomeIcon,
    list: ['Tools', 'Furniture', 'House and Garden', 'Repairs'],
  },
  {
    name: 'Shopping',
    icon: ShoppingIcon,
    list: [
      'Electronics',
      'Clothes',
      'Body Care',
      'Accessories',
      'Education',
      'Pets',
      'Health Care',
      'Children',
      'Gifts',
    ],
  },
  {
    name: 'Fees',
    icon: FeesIcon,
    list: [
      'Internet Bill',
      'Phone Bill',
      'Tax',
      'Mandate',
      'Streaming Services',
      'Subscription Services',
      'Car Fee',
      'Bank Loans',
      'Health Insurance',
      'Electricity Bill',
      'Rent',
    ],
  },
  {
    name: 'Entertainment',
    icon: EntertainmentIcon,
    list: [
      'Alcohol',
      'Events',
      'Sports',
      'Motorcycle',
      'Bike',
      'Books',
      'Hobby',
      'Holidays',
      'Software, Games',
    ],
  },
  {
    name: 'Other',
    icon: OtherIcon,
    list: ['Sale', 'Taxi', 'Public Transport', 'Long Distance Transport'],
  },
  {
    name: 'Payday',
    icon: PaydayIcon,
    list: ['Payday'],
  },
]

export const categoriesList = categories.reduce(
  (acc, value) => acc.concat(value.list),
  []
)

export const currencies = ['zł', '€', '$']

export const icons = [
  {
    name: 'Home',
    icon: HomeIcon,
  },
  {
    name: 'Logout',
    icon: LogoutIcon,
  },
  {
    name: 'Expense',
    icon: ExpenseIcon,
  },
  {
    name: 'Statistic',
    icon: StatisticIcon,
  },
  {
    name: 'Car',
    icon: CarIcon,
  },
  {
    name: 'Food',
    icon: FoodIcon,
  },
  {
    name: 'Fees',
    icon: FeesIcon,
  },
  {
    name: 'Shopping',
    icon: ShoppingIcon,
  },
  {
    name: 'Payday',
    icon: PaydayIcon,
  },
  {
    name: 'EntertainmentIcon',
    icon: EntertainmentIcon,
  },
  {
    name: 'Other',
    icon: OtherIcon,
  },
  {
    name: 'Close',
    icon: CloseIcon,
  },
  {
    name: 'Transaction',
    icon: TransactionIcon,
  },
  {
    name: 'Delete',
    icon: DeleteIcon,
  },
  {
    name: 'Person',
    icon: PersonIcon,
  },
  {
    name: 'Add',
    icon: AddIcon,
  },
  {
    name: 'Update',
    icon: UpdateIcon,
  },
]
