import { useEffect, useState, useRef } from "react";
import { useLogin } from '../Components/ProjectContext';
import { Issue } from '../helpers/types';
import { getIssues } from '../helpers/fetches';
import { Drawer, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import FilterList from '@mui/icons-material/FilterList';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function IssueFilterBar({ setFilteredIssues} : {filteredIssues : any, setFilteredIssues : any}){

    const projectContext = useLogin();
    const [issues, setIssues] = useState<Issue[] | undefined>([])
    const [status, setStatus] = useState<string>('')
    const names = Array.from(new Set(issues?.map(x => x.author.name)))
    const [searchName, setSearchName] = useState<String | undefined>('')
    const [filtered, setFiltered] = useState<Issue[] | undefined>([])
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)


    useEffect(() => {
        const projectID = projectContext?.project?.projectID;
        const token = projectContext?.project?.token;
        if (projectID && token) {
            getIssues(projectID,token).then(data => setIssues(data));
        }
    }, [projectContext?.project])

    useEffect(() => {
        // console.log(issues)
        setFiltered(issues);
        setFilteredIssues(issues);
    },[issues])

    const bothFilters = () => {
        setFiltered(issues)
        if (status){
            setFiltered(prevFiltered => prevFiltered?.filter(x => x.state === status))
        }
        if (searchName){
            setFiltered(prevFiltered => prevFiltered?.filter(x => x.author.name === searchName));
        }
    }

    const submitFilter = () => {
        setFilteredIssues(filtered);
    }

    const clearFilter = () => {
        setSearchName('');
        setStatus('');
        setFiltered(issues);
        setFilteredIssues(issues);
    }

    useEffect(() => {
        bothFilters();
    },[status, searchName])

    const changeStatus = (e : any) => setStatus(e.target.value);
    const changeFilterName = (e: any) => setSearchName(e.target.value)
    const toggleOpenDrawer = () => setOpenDrawer(!openDrawer)

    return (
        <>
        {matches ? 
        <Stack>
            <Container sx={{width:'190px'}}>
                    <IconButton onClick={toggleOpenDrawer} sx={{ width:'100%'}}>
                        <FilterList/>
                    </IconButton>
            </Container>
            <Drawer open={openDrawer} anchor='right'>
            <Stack spacing={2} sx={{ p: 2 }}>
            <IconButton onClick={toggleOpenDrawer}>
                    <ArrowBackIosIcon/>
             </IconButton>
            <FormControl sx={{ width: 130 }}>
            <InputLabel> Status </InputLabel>
            <Select onChange={changeStatus} value={status}>
                <MenuItem key='opened' value='opened'>
                Open
                </MenuItem>
                <MenuItem key='closed' value='closed'>
                Closed
                </MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ width: 130 }}>
            <InputLabel> Navn </InputLabel>
            <Select onChange={changeFilterName} value={searchName}>
                {names?.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button variant="contained" onClick={submitFilter} color="success">Submit</Button>
        <Button variant="contained" onClick={clearFilter} color="error">Clear</Button>
            </Stack>
            </Drawer>
        </Stack> 
        :
        <Stack spacing={2} direction='row' sx={{ p: 2 }}>
        <FormControl sx={{ width: 130 }}>
            <InputLabel> Status </InputLabel>
            <Select onChange={changeStatus} value={status}>
                <MenuItem key='opened' value='opened'>
                Open
                </MenuItem>
                <MenuItem key='closed' value='closed'>
                Closed
                </MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ width: 130 }}>
            <InputLabel> Navn </InputLabel>
            <Select onChange={changeFilterName} value={searchName}>
                {names?.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button variant="contained" onClick={submitFilter} color="success">Submit</Button>
        <Button variant="contained" onClick={clearFilter} color="error">Clear</Button>
    </Stack>
    }
        </>
        )
}

export default IssueFilterBar;