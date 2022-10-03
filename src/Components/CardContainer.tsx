import { useState } from 'react';
import { Commit } from '../helpers/types';
import CommitCard from './CommitCard';
import FilterBar from './FilterBar';
import { useLogin } from '../Components/ProjectContext';


function CardContainer() {

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
                        <div key={JSON.stringify(c)}>
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