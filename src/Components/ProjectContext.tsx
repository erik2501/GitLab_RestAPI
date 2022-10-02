import React, { useContext, createContext, useState, useEffect } from 'react';
import { LoginInfo } from '../helpers/types';

type ProjectContextType = {
    project: LoginInfo | null,
    setProject: React.Dispatch<React.SetStateAction<LoginInfo | null>>
}

export const LoginContext = createContext<ProjectContextType | null>(null);

export const useLogin = () => {
    return useContext(LoginContext);
}

export const ProjectProvider = ({children}: {children: React.ReactNode} ) => {
    const [project, setProject] = useState<LoginInfo | null>(null);
    

    useEffect(() => {
        if(project?.projectID && project?.token) {
            localStorage.setItem('projectID', project.projectID);
            localStorage.setItem('token',project.token);
        }
    }, [project])

    useEffect(() => {
        if (localStorage.getItem('projectID') && localStorage.getItem('token')){
            setProject({
                projectID: localStorage.getItem('projectID'),
                token: localStorage.getItem('token')
            })
        }
    }, [])


    return (
        <LoginContext.Provider value={{ project, setProject }}>
            {children}
        </LoginContext.Provider>
    )
}