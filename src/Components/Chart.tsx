import { useEffect, useState } from 'react';
import { useLogin } from './ProjectContext';
import { PieChart } from 'react-minimal-pie-chart';
import { LabelRenderProps } from 'react-minimal-pie-chart/types/Label';
import { getCommits } from '../helpers/fetches';
import { Commit } from '../helpers/types';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { useMediaQuery, useTheme } from '@mui/material';

var colors = ['#00876c',
'#559d76',
'#86b385',
'#b1c999',
'#dadfb3',
'#fff6d2',
'#f4d7a7',
'#edb682',
'#e79266',
'#e06b56',
'#d43d51']

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

 

export const GetChartData = () => {
    
    const projectContext = useLogin();
    const [commits, setCommits] = useState<Commit[] | undefined>([])

    var authorOccurence: {[name: string]: number } = {}
    var number = 0;
    let data = []

    commits?.forEach((commit) => {
        if (authorOccurence[commit.author_name]) {
            authorOccurence[commit.author_name] += 1;
        } else {
            authorOccurence[commit.author_name] = 1;
        }
    })

    for (let key in authorOccurence) {
        let value = authorOccurence[key];
        
        let insert = {
            color: colors[number],
            title: key,
            value: value,
        }
        data.push(insert);

        number = number + 1;
        if (number == 13){
            number = 0
        }
    }
    console.log(data)

    useEffect(() => {
        const projectID = projectContext?.project?.projectID;
        const token = projectContext?.project?.token;
        if (projectID && token) {
            getCommits(projectID,token).then(data => setCommits(data));
        }
        //console.log(authorOccurence);
    }, [projectContext?.project])
    
    return (data)
}


const renderLabel = (labelRenderProps: LabelRenderProps) => {
    //var xx = labelRenderProps.dataEntry.title + labelRenderProps.dataEntry.value;
    return labelRenderProps.dataEntry.title;
}

const Chart = () => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

        
    return (
        
        <div className='chartcontainer'>
        <div >
            <PieChart
                data={ GetChartData() }
                label={renderLabel}
                labelStyle = {{ fontSize: '3px' }}
                labelPosition = {60}
            />             
        </div>
        <div >
            <BarChart width={matches ? 350 : 450} height={matches ? 200 : 250} data={GetChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='title' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='value' fill="#82ca9d" />
            </BarChart>
        </div>
        </div>

    )
}

export default Chart;
