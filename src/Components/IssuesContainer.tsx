import { Issue } from '../helpers/types';
import { getIssues } from '../helpers/fetches';
import { useEffect, useState } from 'react';

const IssuesContainer = () => {
    const [issues, setIssues] = useState<Issue[] | undefined>([])

    useEffect(() => {
        getIssues().then(data => setIssues(data));
    }, [])

    return(
        <div style={{backgroundColor: 'green'}}>
            <h1>Issues</h1>
            {issues?.map((issue) => (
                <p>{issue.title}</p>
            ))}
        </div>
    )
}

export default IssuesContainer