import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Commit } from '../helpers/types';
import CommitCard from './CommitCard';
import { getCommits } from '../helpers/fetches';
import FilterBar from './FilterBar';
import { useLogin } from '../Components/ProjectContext';


function CardContainer() {
    /*
    const [commits, setCommits] = useState<Commit[] | undefined>([])

    useEffect(() => {
        getCommits().then(data => setCommits(data))
    }, [])
    */
    const [filteredCommits, setFilteredCommits] = useState<Commit[] | undefined>([])
    const projectContext = useLogin();

    if(projectContext?.project){
        return (
            <div>
                <div className='parentcontainer'>
                    <FilterBar filteredCommits={filteredCommits} setFilteredCommits={setFilteredCommits} />
                </div>
                <div className='cardContainer'>
                    {filteredCommits?.map(c => (
                        <div>
                            <CommitCard commit={c} />
                        </div>
                    ))}
                </div>
            </div>
    
        )
    }
    else{
        return(
            <div className='centering'>
                <h1 style={{ marginTop: '50px'}}>You have to log in to view your projects commits.</h1>
            </div>
        )
    }
};

export default CardContainer;