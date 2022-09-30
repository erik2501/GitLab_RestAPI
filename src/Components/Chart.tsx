import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { LabelRenderProps } from 'react-minimal-pie-chart/types/Label';
import { getCommits } from '../helpers/fetches';
import { Commit } from '../helpers/types';

const generateColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`
}

export const GetChartData = () => {
    
    const [commits, setCommits] = useState<Commit[] | undefined>([])

    var authorOccurence: {[name: string]: number } = {}

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
        
        var randomColor = generateColor()
        let insert = {
            color: randomColor,
            title: key,
            value: value,
        }
        data.push(insert);
    }

    useEffect(() => {
        getCommits().then(data => setCommits(data))
        console.log(authorOccurence);
    }, [])

    return (data)
}

const renderLabel = (labelRenderProps: LabelRenderProps) => {
    return labelRenderProps.dataEntry.title;
}

const Chart = () => {
        
    return (
        <div>
            <PieChart
                data={ GetChartData() }
                label={renderLabel}
                labelStyle = {{ fontSize: '4px' }}
                labelPosition = {60}
            />
        </div>
    )
}

export default Chart;
