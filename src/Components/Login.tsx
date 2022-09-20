import React, { useEffect, useReducer } from 'react';
import { Card, CardContent, CardHeader, CardActions, TextField, Button } from '@mui/material';

// Declaring which components the state needs
type State = {
    gitlink: string
    token: string
    helper: string,
    isError: boolean
}

// Initialising start-state
const InitialState:State = {
    gitlink: '',
    token: '',
    helper: '',
    isError: false
}

type Action = {type: 'setGitlink', payload: string}
    | {type: 'setToken', payload: string}
    | {type: 'gitFound', payload: string}
    | {type: 'gitNotFound', payload: string}
    | {type: 'setIsError', payload: boolean}

// 
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
                isError: true
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

    // Function to fetch git-repository
    const handleFindGit = () => {

    }

    return (
        <form className='logincontainer'>
            <Card className=''>
                <CardHeader className='' title="Find Git-repository"/>
                <CardContent>
                    <div>
                        <TextField
                          id="gitlink"
                          label="Git-repository Link"
                          placeholder='Link'
                        />
                        <TextField
                          id="access-token"
                          label="Access Token"
                          placeholder='Token'
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button 
                        variant='contained'
                        className='loginbtn'
                        onClick={handleFindGit}>
                        Find Git-repository
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default Login;