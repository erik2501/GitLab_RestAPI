import { Issue } from '../helpers/types';

function IssueCard({ issue }: { issue: Issue }) {


    return (
        <div className='commitCard'>
            <h5>state: {issue.state}</h5>
            <h5>{
                issue.closed_by ?
                    "closed at: " + (new Date(issue.closed_at)).toLocaleDateString('en-GB') :
                    "created at: " + (new Date(issue.created_at)).toLocaleDateString('en-GB')}</h5>
            <h2>{issue.title}</h2>
            <h3>{"Created by: " + issue.author.name} </h3>
            <h3>{issue.closed_by ? "Closed by: " + issue.closed_by.name : "Closed by: not yet closed"} </h3>
        </div>
    );


};

export default IssueCard;