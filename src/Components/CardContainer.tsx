import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Commit } from '../helpers/types';
import CommitCard from './CommitCard';
import { getCommits } from '../helpers/fetches';


function CardContainer() {

    const [commits, setCommits] = useState<Commit[] | undefined>([])

    useEffect(() => {
        getCommits().then(data => setCommits(data))
    }, [])

    return (
        <div className='cardContainer'>
            {commits?.map(c => (
                <div>
                    <CommitCard commit={c} />
                </div>
            ))}
        </div>
    )
};

export default CardContainer;