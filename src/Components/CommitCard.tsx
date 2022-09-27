import { Commit } from '../helpers/types';


export default function CommitCard({ commit }: { commit: Commit }) {

    return (
        <div className='commitCard'>
            <h5>{commit.committed_date.toString()}</h5>
            <h2>{commit.title}</h2>
            <h5>{commit.committer_name}</h5>
            <h4>{commit.message}</h4>
        </div>
    );
}