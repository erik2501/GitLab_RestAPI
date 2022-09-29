import React, { useEffect, useReducer, useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, TextField, Button } from '@mui/material';
import { getProjectInfo } from '../helpers/fetches';
import { Project } from "../helpers/types";

// // Declaring which components the state needs
// type State = {
//     gitlink: string
//     token: string
//     helper: string
//     isError: boolean
//     error: string
// }

// // Initialising start-state
// const InitialState: State = {
//     gitlink: '',
//     token: '',
//     helper: '',
//     isError: false,
//     error: ''
// }

// type Action = { type: 'setGitlink', payload: string }
//     | { type: 'setToken', payload: string }
//     | { type: 'gitFound', payload: string }
//     | { type: 'gitNotFound', payload: string }
//     | { type: 'setIsError', payload: boolean }


// const login = (state: State, action: Action): State => {
//     switch (action.type) {
//         case ('setGitlink'):
//             return {
//                 ...state,
//                 gitlink: action.payload
//             }
//         case ('setToken'):
//             return {
//                 ...state,
//                 token: action.payload
//             }
//         case ('gitFound'):
//             return {
//                 ...state,
//                 helper: action.payload,
//                 isError: false
//             }
//         case ('gitNotFound'):
//             return {
//                 ...state,
//                 helper: action.payload,
//                 isError: true,
//                 error: 'Incorrect link to git-repository or access-token! Try again.',
//                 gitlink: '',
//                 token: ''
//             }
//         case ('setIsError'):
//             return {
//                 ...state,
//                 isError: action.payload
//             }
//     }
// }


const Login = () => {
    //const [state, dispatch] = useReducer(login, InitialState);

    const [projectID, setProjectID] = useState<string | undefined>();
    const [token, setToken] = useState<string>();
    const [projectInfo, setProjectInfo] = useState<Project | undefined>();
    const [message, setMessage] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState<boolean>();

    const handleFindGit = async () => {
        if (!projectID || !token){
            setMessage('You have to fill out both Project ID and Access Token. Please try again.');
            return;
        }
        localStorage.setItem('projectID', projectID);
        localStorage.setItem('accessToken', token);
        await getProjectInfo()
            .then(data => {
                setProjectInfo(data);
            })
            .catch(error => console.log('error'))
        
        if (!projectInfo){
            setMessage('Could not find this gitlab project. Please try again.');
        }
    }

    useEffect(() => {
        //getProjectInfo().then(data => setProjectInfo(data)) // med bruk av react query tror jeg ikke jeg trenger denne..
        const loggedInFromLS = localStorage.getItem('loggedIn');
        if (loggedInFromLS == 'true') {setLoggedIn(true)}
        setMessage('');
    },[])

    useEffect(() => {
        if (projectInfo){
            console.log(projectInfo);
            setLoggedIn(true);
            localStorage.setItem('loggedIn', 'true');
        }
        console.log(projectInfo)
    }, [projectInfo])

    useEffect(() => {
        console.log(loggedIn)
    }, [loggedIn])

    useEffect(() => {
        setMessage('');
    },[projectID, token])

    const logOut = () => {
        localStorage.clear()
        setProjectID(undefined);
        setToken(undefined);
        setProjectInfo(undefined);
        setMessage('');
        setLoggedIn(false);
    }

    if (loggedIn) {
        return (
            <div className='parentcontainer'>
                <h1>You're now viewing {projectInfo?.name}!</h1>
                <Button onClick={logOut} className='loginBtn' variant='contained'>Log out</Button>
            </div>
        )
    }
    else {
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
                                    id="projectID"
                                    label="Project ID"
                                    placeholder='Link'
                                    value={projectID}
                                    onChange={(event) => { setProjectID(event.target.value); }}
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
                                <p>{message}</p>
                            </div>
                        </CardActions>
                    </Card>
                </form>
            </div>
        )   
    }
}


export default Login;