import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, TextField, Button } from '@mui/material';
import { getProjectInfo } from '../helpers/fetches';
import { Project } from "../helpers/types";
import { useLogin } from './ProjectContext';


const Login = () => {

    const projectContext = useLogin();
    const [projectID, setProjectID] = useState<string>();
    const [token, setToken] = useState<string>();
    const [message, setMessage] = useState<string>('');
    const [projectData, setProjectData] = useState<Project>();
    const [teamName, setTeamName] = useState<string | null>()

    useEffect(() => {
        if (projectData?.id !== -1 && projectID && token) {
            projectContext?.setProject({
                projectID: projectID,
                token: token
            })
            if (projectData) {
                setTeamName(projectData.namespace.name);
                localStorage.setItem('teamName', projectData.namespace.name);
            }
        } else {
            setMessage('Wrong login info, try again.');
        }
    }, [projectData])

    useEffect(() => {
        const lsProjectID = localStorage.getItem('projectID');
        const lsToken = localStorage.getItem('token');
        setTeamName(localStorage.getItem('teamName'));
        if (lsProjectID && lsToken) {
            projectContext?.setProject({
                projectID: lsProjectID,
                token: lsToken
            })
            setProjectID(lsProjectID);
            setToken(lsToken);
        }
        setMessage('');
    }, [])

    const logIn = () => {
        if (projectID && token) {
            getProjectInfo(projectID, token).then(data => setProjectData(data));
        } else {
            setMessage('You have to fill in all forms');
        }
    }

    const logOut = () => {
        projectContext?.setProject(null);
        setMessage('');
        setProjectID('');
        setToken('');
        localStorage.setItem('projectID', '');
        localStorage.setItem('token', '');
    }


    if (projectContext?.project) {
        return (
            <div className='parentcontainer'>
                <h1>Welcome to {teamName}!</h1>
                <Button
                    onClick={logOut}
                    className='loginBtn'
                    variant='contained'
                    style={{ backgroundColor: '#55828b' }}>
                    Log out
                </Button>
            </div>
        )
    }
    else {
        return (
            <div className='parentcontainer'>
                <form className='logincontainer'>
                    <Card className='loginCard' sx={{ width: '100%', boxShadow: '10' }}>
                        <div className='parentcontainer'>
                            <CardHeader className='cardHeaderLogin' title="Find your Git-repository"  />
                        </div>
                        <CardContent className='loginTextFields' >
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
                                    data-testid='loginBtn'
                                    className='loginBtn'
                                    // We have used inline styling here because this is a mui button
                                    style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#55828b' }}
                                    variant='contained'
                                    onClick={logIn}>
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