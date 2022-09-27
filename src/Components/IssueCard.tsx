import { Issue } from '../helpers/types';

function IssueCard({ issue }: { issue: Issue }) {


    return (
        <div className='commitCard'>
            <h5>state: {issue.state}</h5>
            <h5>{issue.closed_by ? "closed at: " + issue.closed_at : "created at: " + issue.created_at}</h5>
            <h2>{issue.title}</h2>
            <h5>{issue.closed_by ? "closed by: " + issue.closed_by.name : "created by: " + issue.author.name} </h5>
            <h4>{issue.description}</h4>
        </div>
    );


};

export default IssueCard;