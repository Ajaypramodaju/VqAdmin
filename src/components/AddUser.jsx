import { useState } from 'react'
import Heading from './partials/Heading'
import GeneralTemplate from './templates/GeneralTemplate'
import styled from 'styled-components'
import { useAuthContext } from './contexts/AuthContext'
import { DB } from '../firebase'
import firebase from 'firebase/app'

function AddUser() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { user } = useAuthContext()

    const createUser = (e) => {
        e.preventDefault()
        if (!!!username?.trim() || !!!password?.trim() || !!!user) return

        if (password?.trim() !== confirmPassword?.trim()) {
            alert('!! Passwords do not Match')
            return
        }

        const code = prompt('Enter Unique Code')
        if (code === user?.password) {
            DB.ref(`main/SuperAdminCredentials/${username?.split('@')[0]}`)
                .set({
                    password: password,
                    uname: username?.trim(),
                    verifiedBy: user?.uname,
                    verifiedAt: firebase.database.ServerValue.TIMESTAMP
                })
                .then(() => {
                    alert('Admin Created')
                })
                .catch(() => {
                    alert('!! Error Occured')
                })
        } else {
            alert('!! Invalid Code')
        }
    }

    return (
        <GeneralTemplate>
            <Heading title={'Create Admin'} />
            <Card>
                <form onSubmit={createUser}>
                    <InputField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="email"
                        placeholder="Username"
                        required
                    />

                    <InputField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />

                    <InputField
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm Password"
                        required
                    />

                    <FormButton type="submit">Create Admin</FormButton>
                </form>
            </Card>
        </GeneralTemplate>
    )
}

const Card = styled.div`
    background: #ffffff;
    border: 1px solid #dddddd;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    padding: 20px;
    margin: auto;
    margin-bottom: 30px;
    max-width: 450px;
    width: 100%;
`

const InputField = styled.input`
    width: 100%;
    outline: none;
    border: none;
    background: #f1f3f8;
    border-radius: 10px;
    color: #666;
    padding: 15px 20px;
    font-size: 16px;
    margin: 10px 0;

    &::placeholder {
        color: #9ea8bd;
    }
`

const FormButton = styled.button`
    background-color: #12389f;
    outline: none;
    border: none;
    color: #fff;
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
    transition: transform ease-in-out 0.15s;
    font-size: 16px;

    &:hover {
        transform: scale(1.02);
    }
    &:active {
        transform: scale(0.98);
    }
`

export default AddUser
