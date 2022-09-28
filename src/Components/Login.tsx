import React, { useReducer, useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, TextField, Button } from '@mui/material';

// Declaring which components the state needs
type State = {
    gitlink: string
    token: string
    helper: string
    isError: boolean
    error: string
}

// Initialising start-state
const InitialState: State = {
    gitlink: '',
    token: '',
    helper: '',
    isError: false,
    error: ''
}

type Action = { type: 'setGitlink', payload: string }
    | { type: 'setToken', payload: string }
    | { type: 'gitFound', payload: string }
    | { type: 'gitNotFound', payload: string }
    | { type: 'setIsError', payload: boolean }


const login = (state: State, action: Action): State => {
    switch (action.type) {
        case ('setGitlink'):
            return {
                ...state,
                gitlink: action.payload
            }
        case ('setToken'):
            return {
                ...state,
                token: action.payload
            }
        case ('gitFound'):
            return {
                ...state,
                helper: action.payload,
                isError: false
            }
        case ('gitNotFound'):
            return {
                ...state,
                helper: action.payload,
                isError: true,
                error: 'Incorrect link to git-repository or access-token! Try again.',
                gitlink: '',
                token: ''
            }
        case ('setIsError'):
            return {
                ...state,
                isError: action.payload
            }
    }
}


const Login = () => {
    const [state, dispatch] = useReducer(login, InitialState);

    const [gitlink, setGitlink] = useState<string>('');
    const [token, setToken] = useState<string>('');

    // Function to fetch git-repository
    const handleFindGit = () => {
        localStorage.setItem('gitLink', gitlink)
        localStorage.setItem('accessToken', token)
    }

    return (
        <div className='parentcontainer'>
            <form className='logincontainer'>
                <Card sx={{ width: '100%' }}>
                    <div className='parentcontainer'>
                        <CardHeader title="Find your Git-repository" style={{ display: 'flex', justifyText: 'center' }} />
                    </div>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', columnGap: '10px' }}>
                        <div>
                            <TextField
                                id="gitlink"
                                label="Git-repository Link"
                                placeholder='Link'
                                value={gitlink}
                                onChange={(event) => { setGitlink(event.target.value); }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="access-token"
                                label="Access Token"
                                placeholder='Token'
                                value={token}
                                onChange={(event) => { setToken(event.target.value); }}
                            />
                        </div>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <Button
                                style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}
                                variant='contained'
                                className='loginbtn'
                                onClick={handleFindGit}>
                                Find Git-repository
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </form>
        </div>)
}


export default Login;