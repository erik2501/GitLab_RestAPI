import React from 'react';
import { useNavigate } from 'react-router-dom';

const navstyle = {
    backgroundColor: 'lightgrey',
    minWidth: '180px',
    padding: '14px',
    margin: '15px',
    display: 'flex',
    borderRadius: '15px',
    justifyContent: 'center',
    alignItems: 'center'
}

const textstyle = {
    margin: '0px'
}

const Navbar = () => {

    const nav = useNavigate();
    const updateNav = (url: String) => {
        nav('/' + url)
    } 

    // const {data, isLoding, isError} = useQuery(['getCommits'], getCoomits(), {})


    return (
        <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <div id={'groupmanagerBtn'} style={navstyle} onClick={() => updateNav('')}>
                <h4 style={textstyle}>Group manager</h4>
            </div>
            <div id={'commitsBtn'} style={navstyle} onClick={() => updateNav('commits')}>
                <h4 style={textstyle}>Commits</h4>
            </div>
            <div id={'issuesBtn'} style={navstyle} onClick={() => updateNav('issues')}>
                <h4 style={textstyle}>Issues</h4>
            </div>
        </div>
    )
};

export default Navbar;