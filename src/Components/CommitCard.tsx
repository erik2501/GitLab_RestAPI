import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function CommitCard() {
    return (
        <Card sx={{ minWidth: 275 }} style={{ backgroundColor: "#D9D9D9" }}>
            <CardContent >
                <Typography id="date" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    06.september 2022
                </Typography>
                <Typography id="title" variant="h5" component="div">
                    Title of commit
                </Typography>
                <Typography id="name" sx={{ mb: 1.5 }} color="text.secondary">
                    Name of committer
                </Typography>
                <Typography id="commitmessage" variant="body2">
                    commitmessage
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Setup</Button>
            </CardActions>
        </Card>
    );
}