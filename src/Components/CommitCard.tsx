import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Commit } from '../helpers/types';


type CommitCardProps = {
    commit: Commit;
}
export default function CommitCard(props: CommitCardProps) {
    
        return (
            
            <Card sx={{ minWidth: 275 }}>
                <CardContent style={{ backgroundColor: "#D9D9D9" }}>
                    <Typography id="date" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.commit.committed_date.toString()}
                    </Typography>
                    <Typography id="title" variant="h5" component="div">
    
                        {props.commit.title}
                    </Typography>
                    <Typography id="name" sx={{ mb: 1.5 }} color="text.secondary">
    
                        {props.commit.committer_name}
                    </Typography>
                    <Typography id="description" variant="body2">
                        {props.commit.message}
                    </Typography>
    
                </CardContent>
            </Card>
        );
}