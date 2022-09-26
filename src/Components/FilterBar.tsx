import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Commit } from '../helpers/types';
import CommitCard from './CommitCard';
import { getCommits } from '../helpers/fetches';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

function FilterBar() {

    const [commits, setCommits] = useState<Commit[] | undefined>([])
    const [filtered, setFiltered] = useState<Commit[] | undefined>([])
    const [namefilter, setNameFilter] = useState<Commit[] | undefined>([])
    const [searchName, setSearchName] = useState<String | undefined>()
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs())
    const names = Array.from(new Set(commits?.map(x => x.author_name)))
    const [dateFilter, setDateFilter] = useState<Commit[] | undefined>([])


    useEffect(() => {
        getCommits().then(data => setCommits(data))
    }, [])


    //filtrerer alfabetisk skal kanskje ikke brukes
    const filterAlpha = () => {
        if (commits != undefined) {
            setFiltered(commits?.sort((a, b) => a.author_name.localeCompare(b.author_name)));
        }
    }

    //klarer alle filtere
    const clearFilters = () => {
        getCommits().then(data => setFiltered(data))
        setStartDate(dayjs())
        setEndDate(dayjs())
        setSearchName(undefined)
    }
    //filtrerer på navn
    const filterName = () => {
        setFiltered(commits?.filter(x => x.author_name === searchName));
        console.log(namefilter);
    }
    
    //clear kun liste
    const clearList = () => {
        getCommits().then(data => setFiltered(data))
    }
    
    //TODO filtrerer på dato
    const filterDate = () => {

        if (startDate != null && endDate != null){
            console.log(startDate <= endDate);
            setFiltered(commits?.filter(a => (dayjs(a.committed_date) > startDate && dayjs(a.committed_date) < endDate)));
            console.log(filtered)
        }
    }

    const submitFilter = () => {
        filterName();
        filterDate();
    }

    const changeFilterName = (e: any) => setSearchName(e.target.value)
    const handleChangeStartDate = (newValue: Dayjs | null) => setStartDate(newValue)
    const handleChangeEndDate = (newValue: Dayjs | null) => setEndDate(newValue)

    //Det som vises på skjerm
    return (
        <Stack spacing={2} direction='row' sx={{ p: 2 }}>
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/DD/YYYY"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button variant="contained" onClick={submitFilter} color="success">Submit</Button>
            <Button variant="contained" onClick={clearFilters} color='error'>Clear</Button>
        </Stack>

    )
}


export default FilterBar;