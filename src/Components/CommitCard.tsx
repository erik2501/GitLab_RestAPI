import { Commit } from '../helpers/types';


type CommitCardProps = {
    commit: Commit;
}

export default function CommitCard(props: CommitCardProps) {

    return (
        <div className='commitCard'>
            <h5>{props.commit.committed_date.toString()}</h5>
            <h2>{props.commit.title}</h2>
            <h5>{props.commit.committer_name}</h5>
            <h4>{props.commit.message}</h4>
        </div>
    );
}