import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import BugReportIcon from '@material-ui/icons/BugReport'
import { navDirections } from './navDirections'

export const sideNav = [
    {
        target: navDirections.ADMIN_PANEL,
        icon: <HomeRoundedIcon />,
        text: 'Home'
    },
    {
        target: navDirections.NOT_VERIFIED,
        icon: <NoEncryptionIcon />,
        text: 'Not Verified'
    },
    {
        target: navDirections.VERIFIED,
        icon: <HttpsRoundedIcon />,
        text: 'Verified'
    },
    {
        target: navDirections.BUG_REPORT,
        icon: <BugReportIcon />,
        text: 'Bug Reports'
    },
    {
        target: navDirections.ADD_USER,
        icon: <PersonAddIcon />,
        text: 'Add User'
    }
]
