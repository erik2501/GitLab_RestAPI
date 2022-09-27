import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Commit } from '../helpers/types';
import CommitCard from './CommitCard';
import { getCommits } from '../helpers/fetches';
import FilterBar from './FilterBar';


function CardContainer() {
    /*
    const [commits, setCommits] = useState<Commit[] | undefined>([])

    useEffect(() => {
        getCommits().then(data => setCommits(data))
    }, [])
    */
    const [filteredCommits, setFilteredCommits] = useState<Commit[] | undefined>([])

    return (
        <div className='cardContainer'>
            <div>
                <FilterBar filteredCommits={filteredCommits} setFilteredCommits={setFilteredCommits} />
            </div>
            {filteredCommits?.map(c => (
                <div>
                    <CommitCard commit={c} />
                </div>
            ))}
        </div>
    )
};

export default CardContainer;