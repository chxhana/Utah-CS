import { Grid, Typography, IconButton, FormControl, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { FC, useContext } from "react";
import Store from "../Interface/Store";
import NumbersIcon from '@mui/icons-material/Numbers';
import PercentIcon from '@mui/icons-material/Percent';
import { observer } from "mobx-react-lite";
import { PossibleCategories, PossibleSchoolYears } from "../Preset/Constants";
import { CourseCategoryColor, LightGray } from "../Preset/Colors";


const SettingBar: FC = () => {

    // const [CSMenuAnchorEl, setCSMenuAnchorEl] = useState<null | HTMLElement>(null);
    // const handleCSMenuClose = () => {
    //     setCSMenuAnchorEl(null);
    // };
    // const handleCSTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setCSMenuAnchorEl(event.currentTarget);
    // };

    // const [yearMenuAnchorEl, setYearMenuAnchorEl] = useState<null | HTMLElement>(null);
    // const handleYearMenuClose = () => {
    //     setYearMenuAnchorEl(null);
    // };
    const handleYearChange = (e: SelectChangeEvent) => {
        store.updateSchoolYEar(e.target.value);
    };

    const handleCSChange = (e: SelectChangeEvent) => {
        store.updateSelectedCategory(e.target.value);
    };

    const handlePercentChange = () => {
        store.updateShowPercentage();
    };

    const store = useContext(Store);
    // TODO change the spans into form controls
    return (
        <Grid container rowSpacing={1.5} sx={{ textAlign: 'center' }} >
            <Grid item xs={12} md={5}>

                <FormControl variant="standard" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <span> Course Category</span>
                            <Select value={store.currentShownCSType} onChange={handleCSChange} label='Course Category'  style={{ color: CourseCategoryColor[store.currentShownCSType] ,paddingLeft: '5px' }}>
                        {PossibleCategories.map((category) => (
                            <MenuItem key={`${category.name}-mi`} value={category.key}>{category.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
                <FormControl variant="standard" style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <span>Academic Year</span>
                    <Select value={store.schoolYearShowing} onChange={handleYearChange} label='Academic Year' style={{ paddingLeft: '5px' }}>
                        {PossibleSchoolYears.map((year) => (
                            <MenuItem value={year} key={`${year}-mi`}>{year}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                {/* <span onClick={handleYearTypeClick} style={{ cursor: 'pointer' }}>
                    <u>{store.schoolYearShowing}</u>
                    <ArrowDropDownIcon fontSize='small' style={{ verticalAlign: 'text-bottom' }} />
                </span> */}
                {/* Academic Year */}
            </Grid>
            <Grid item xs={12} md={2}>
                <FormControl variant="standard" style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <span>Display</span>
                    <Select value={store.showPercentage} onChange={handlePercentChange} label='Stats Display' style={{ paddingLeft: '5px' }}>
                        <MenuItem value="true">%</MenuItem>
                        <MenuItem value="false">#</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        {/* <CSMenu anchorEl={CSMenuAnchorEl} handleClose={handleCSMenuClose} />
        <AcademicYearMenu anchorEl={yearMenuAnchorEl} handleClose={handleYearMenuClose} /> */}
        </Grid>);
};

export default observer(SettingBar);
