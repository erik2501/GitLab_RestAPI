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
        <div style={{ padding: "30px" }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                {commits?.map(c => (
                    <Grid item xs={2} sm={4} md={4}>
                        <CommitCard commit={c} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
};

export default CardContainer;