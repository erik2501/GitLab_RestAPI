import { Issue, User } from '../helpers/types';
import { getIssues } from '../helpers/fetches';
import { useEffect, useState } from 'react';
import IssueCard from './IssueCard';

const IssuesContainer = () => {
    const [issues, setIssues] = useState<Issue[] | undefined>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getIssues().then(data => setIssues(data));
    }, [])

    return (
        <div className='cardContainer'>
            {issues?.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
    )
}

export default IssuesContainer