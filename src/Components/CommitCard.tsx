import { Commit } from '../helpers/types';


export default function CommitCard({ commit }: { commit: Commit }) {

    return (
        <div className='commitCard'>
            <h5>{(new Date(commit.committed_date)).toLocaleDateString('en-GB')}</h5>
            <h2>{commit.title}</h2>
            <h5>{commit.committer_name}</h5>
        </div>
    );
}