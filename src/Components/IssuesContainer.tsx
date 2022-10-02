import { Issue, User } from '../helpers/types';
import { getIssues } from '../helpers/fetches';
import { useEffect, useState } from 'react';
import IssueCard from './IssueCard';
import IssueFilterBar from './IssueFilterBar';
import { useLogin } from '../Components/ProjectContext';

const IssuesContainer = () => {
    // const [issues, setIssues] = useState<Issue[] | undefined>([]);
    // const [users, setUsers] = useState<User[]>([]);
    const projectContext = useLogin();

    // useEffect(() => {
    //     const projectID = projectContext?.project?.projectID;
    //     const token = projectContext?.project?.token;
    //     if (projectID && token) {
    //         getIssues(projectID,token).then(data => setIssues(data));
    //     }
    // }, [])
    const [filteredIssues, setFilteredIssues] = useState<Issue[] | undefined>([]);

    if (projectContext?.project) {
        return(
            <div>
                <div className='parentcontainer'>
                    <IssueFilterBar filteredIssues={filteredIssues} setFilteredIssues={setFilteredIssues}/>
                </div>
            <div className='cardContainer'>

                {filteredIssues?.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
            </div>
        )
    }
    else{
        return(
            <div className='centering'>
                <h1 style={{ marginTop: '50px'}}>You have to log in to view your project's issues.</h1>
            </div>
        )
    }
}

export default IssuesContainer