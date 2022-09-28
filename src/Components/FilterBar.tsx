import { Drawer, IconButton, ListItem, ListItemIcon, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Commit } from '../helpers/types';
import { getCommits } from '../helpers/fetches';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FilterList from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Container } from '@mui/system';

function FilterBar({filteredCommits , setFilteredCommits} : {filteredCommits : any, setFilteredCommits : any}) {

    const [commits, setCommits] = useState<Commit[] | undefined>([])
    const [filtered, setFiltered] = useState<Commit[] | undefined>([])
    const [searchName, setSearchName] = useState<String | undefined>()
    const [startDate, setStartDate] = useState<Dayjs | null>()
    const [endDate, setEndDate] = useState<Dayjs | null>()
    const names = Array.from(new Set(commits?.map(x => x.author_name)))
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    //console.log(matches);

    useEffect(() => {
        getCommits().then(data => setCommits(data))
        getCommits().then(data => setFilteredCommits(data))
    }, [])


    //filtrerer alfabetisk, skal kanskje ikke brukes
    const filterAlpha = () => {
        if (commits != undefined) {
            setFiltered(commits?.sort((a, b) => a.author_name.localeCompare(b.author_name)));
        }
    }

    //klarer alle filtere
    const clearFilters = () => {
        getCommits().then(data => setFilteredCommits(data))
        setStartDate(dayjs())
        setEndDate(dayjs())
        setSearchName(undefined) //funker ikke, spør stud ass
    }
    
    //filtrerer på navn
    const filterName = () => {
        setFiltered(commits?.filter(x => x.author_name === searchName));
        //console.log(searchName);
        //console.log(filtered);
    }
    
    //clear kun liste
    const clearList = () => {
        getCommits().then(data => setFiltered(data))
    }
    
    //TODO filtrerer på dato
    const filterDate = () => {

        if (startDate != null && endDate != null){
            setFiltered(commits?.filter(a => (dayjs(a.committed_date) > startDate && dayjs(a.committed_date) < endDate)));
            //console.log(filtered)
        }
    }

    const submitFilter = () => {
        filterName();
        filterDate();
        setFilteredCommits(filtered); //fungerer men fortsatt på to forsøk
    }

    const toggleOpenDrawer = () => setOpenDrawer(!openDrawer)
    const changeFilterName = (e: any) => setSearchName(e.target.value)
    const handleChangeStartDate = (newValue: Dayjs | null) => setStartDate(newValue)
    const handleChangeEndDate = (newValue: Dayjs | null) => setEndDate(newValue)

    //Det som vises på skjerm
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
                </Drawer>
        </Stack>
 :
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
    }   
        </>
    )
}


export default FilterBar;