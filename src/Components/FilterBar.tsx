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
    const [filtered, setFilteredCommits] = useState<Commit[] | undefined>([])
    const [namefilter, setNameFilter] = useState<Commit[] | undefined>([])
    const [searchName, setSearchName] = useState<String | undefined>()
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs())
    const names = Array.from(new Set(commits?.map(x => x.author_name)))


    useEffect(() => {
        getCommits().then(data => setCommits(data))
    }, [])


    //filtrerer alfabetisk
    const filterAlpha = () => {
        if (commits != undefined) {
            setFilteredCommits(commits?.sort((a, b) => a.author_name.localeCompare(b.author_name)));
        }
    }

    //filtrerer på navn
    const filterName = () => {
        setNameFilter(commits?.filter(x => x.author_name === searchName));
        console.log(namefilter);
    }

    //TODO filtrerer på dato
    const filterDate = () => {
        console.log('Her skal det filtrers på dato')
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
            <Button variant="contained" onClick={filterName}>Submit</Button>
        </Stack>

    )
}


export default FilterBar;