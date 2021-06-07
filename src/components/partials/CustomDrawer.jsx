import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core'
import styled from 'styled-components'
import { useAuthContext } from '../contexts/AuthContext'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import { Link } from 'react-router-dom'
import { sideNav } from '../utils/sideNav'

const useStyles = makeStyles(() => ({
    list: {
        width: 250
    }
}))

function CustomDrawer() {
    const classes = useStyles()
    const { logout } = useAuthContext()

    return (
        <Drawer variant="permanent" anchor="left">
            <ListWrapper className={classes.list}>
                <List>
                    <ListItem button>
                        <ListItemText primary={'Super Admin'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {sideNav.map((item, key) => (
                        <Link to={item.target} key={key}>
                            <ListItem button>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    <div onClick={logout}>
                        <ListItem button>
                            <ListItemIcon>
                                <PowerSettingsNewIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItem>
                    </div>
                </List>
            </ListWrapper>
        </Drawer>
    )
}

const ListWrapper = styled.div`
    a {
        text-decoration: none;
        color: inherit;
    }
`

export default CustomDrawer
