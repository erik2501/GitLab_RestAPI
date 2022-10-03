import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const nav = useNavigate();
    const updateNav = (url: String) => {
        nav('/' + url)
    } 



    return (
        <div className='navbarContainer'>
            <button id={'groupmanagerBtn'} className='button-15' onClick={() => updateNav('')}> Group manager</button>
            <button data-testid='commitBtn' id={'commitsBtn'} className='button-15' onClick={() => updateNav('commits')}> Commits</button>
            <button id={'issuesBtn'} className='button-15' onClick={() => updateNav('issues')}> Issues </button>
            <button id={'dataBtn'} className='button-15' onClick={() => updateNav('data')}> Data </button>
        </div>
    )
};

export default Navbar;