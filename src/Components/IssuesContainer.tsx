import { Issue } from '../helpers/types';
import { useState } from 'react';
import IssueCard from './IssueCard';
import IssueFilterBar from './IssueFilterBar';
import { useLogin } from '../Components/ProjectContext';

const IssuesContainer = () => {

    const projectContext = useLogin();
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