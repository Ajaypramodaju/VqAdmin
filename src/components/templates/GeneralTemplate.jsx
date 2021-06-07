import { Container } from '@material-ui/core'
import styled from 'styled-components'
import CustomDrawer from '../partials/CustomDrawer'

function GeneralTemplate({ children }) {
    return (
        <Wrapper>
            <CustomDrawer />
            <Container>{children}</Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-left: 260px;
    padding-top: 40px;
`

export default GeneralTemplate
