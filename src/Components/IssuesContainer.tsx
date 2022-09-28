import { Issue, User } from '../helpers/types';
import { getIssues } from '../helpers/fetches';
import { useEffect, useState } from 'react';
import IssueCard from './IssueCard';
import IssueFilterBar from './IssueFilterBar';

const IssuesContainer = () => {
    const [issues, setIssues] = useState<Issue[] | undefined>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getIssues().then(data => setIssues(data));
    }, [])

    const [filteredIssues, setFilteredIssues] = useState<Issue[] | undefined>([]);
    return (
        <div>
        <div>
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

export default IssuesContainer