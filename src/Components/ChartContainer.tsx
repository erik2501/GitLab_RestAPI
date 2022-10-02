import Chart from './Chart';
import { useLogin } from '../Components/ProjectContext';

const ChartContainer = () => {

    const projectContext = useLogin();

    if (projectContext?.project){
        return (
            <div className='chartcontainer'>
                <div style={{width:'100%'}}>
                    <h3>Piechart and barchart showing distribution of commits by group members</h3>
                </div>
                <Chart/>
            </div>
        )
    }
    else {
        return(
            <div className='centering'>
                <h1 style={{ marginTop: '50px'}}>You have to log in to view the project statistics.</h1>
            </div>
        )
    }
    
}

export default ChartContainer;