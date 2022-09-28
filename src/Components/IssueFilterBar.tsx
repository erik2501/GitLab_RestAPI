import React from "react";
import { useEffect, useState } from "react";
import { Issue } from '../helpers/types';
import { getCommits, getIssues } from '../helpers/fetches';
import { Drawer, IconButton, ListItem, ListItemIcon, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


function IssueFilterBar({filteredIssues , setFilteredIssues} : {filteredIssues : any, setFilteredIssues : any}){

    const [issues, setIssues] = useState<Issue[] | undefined>([])
    const [status, setStatus] = useState<string>()
    const names = Array.from(new Set(issues?.map(x => x.author.name)))
    const [searchName, setSearchName] = useState<String | undefined>()
    const [filtered, setFiltered] = useState<Issue[] | undefined>([])
    const [nameFilter, setNameFilter] = useState<Issue[] | undefined>([])
    const [statusFilter, setStatusFilter] = useState<Issue[] | undefined>([])

    useEffect(() => {
        getIssues().then(data => setIssues(data))
        getIssues().then(data => setFiltered(data))
        getIssues().then(data => setStatusFilter(data))
        getIssues().then(data => setNameFilter(data))
    }, [])

    useEffect(() => {
        setFilteredIssues(filtered);
    }, [filtered, nameFilter, statusFilter])


    const filterName = () => {
        setNameFilter(issues?.filter(x => x.author.name === searchName));
        setFiltered(issues?.filter(x => x.author.name === searchName));
    }

    const filterStatus = () => {
        setStatusFilter(issues?.filter(x => x.state === status))
        setFiltered(issues?.filter(x => x.state === status))
    }

    const compareFilters = () => {
        setFiltered(nameFilter?.filter(o => statusFilter?.some(({id}) => o.id === id )))
    }

    const submitFilter = () => {
        /*
        if (status == undefined) {
            filterName();
        }
        if (searchName == undefined) {
            filterStatus();
        }
        else {
            filterStatus();
            filterName();
        }
        compareFilters();
        */
        filterStatus();
        filterName();
        setFilteredIssues(filtered);
    }


    const changeStatus = (e : any) => setStatus(e.target.value);
    const changeFilterName = (e: any) => setSearchName(e.target.value)

    return (
        <Stack spacing={2} direction='row' sx={{ p: 2 }}>
            <FormControl sx={{ width: 130 }}>
                <InputLabel> Status </InputLabel>
                <Select onChange={changeStatus}>
                    <MenuItem value='opened'>
                    Open
                    </MenuItem>
                    <MenuItem value='closed'>
                    Closed
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ width: 130 }}>
                <InputLabel> Navn </InputLabel>
                <Select onChange={changeFilterName}>
                    {names?.map((name) => (
                        <MenuItem value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={submitFilter} color="success">Submit</Button>
        </Stack>

        )
}

export default IssueFilterBar;