import styled from 'styled-components'

function Heading({ title }) {
    return <HeadingText>{title}</HeadingText>
}

const HeadingText = styled.h1`
    margin: 30px auto;
    text-align: center;
    font-weight: 500;
    font-size: 28px;
`

export default Heading
