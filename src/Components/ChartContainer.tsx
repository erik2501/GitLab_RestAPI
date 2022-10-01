import Chart from './Chart';

const ChartContainer = () => {

    return (
        <div className='chartcontainer'>
            <div style={{width:'100%'}}>
                <h3>Piechart and barchart showing distribution of commits by group members</h3>
            </div>
            <Chart/>
        </div>
    )
}

export default ChartContainer;