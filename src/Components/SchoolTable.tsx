import { TableContainer, Container, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@mui/material";
import { csv } from "d3-fetch";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { stateUpdateWrapperUseJSON } from "../Interface/StateChecker";
import Store from "../Interface/Store";
import SchoolRow from "./SchoolRow";
type Props = {

};

const SchoolTable: FC<Props> = ({ }: Props) => {
    // const [schoolCSOffer, setSchoolCSOffer] = useState([]);

    const [schoolDemographic, setSchoolDemographic] = useState([]);

    const store = useContext(Store);

    useEffect(() => {
        // shool offering
        csv("/data/schoolOffer.csv")
            .then((schoolCSOfferInput) => {
                csv("/data/schoolDemo.csv").then((schoolDemo) => {
                    const schoolDemoCopy = schoolDemo.filter(d => d['LEA TYPE'] === 'District').map((schoolEntry) => {
                        const totalHS = parseInt(schoolEntry['Grade_9'] || '0') + parseInt(schoolEntry['Grade_10'] || '0') + parseInt(schoolEntry['Grade_11'] || '0') + parseInt(schoolEntry['Grade_12'] || '0');
                        return {
                            ...schoolEntry,
                            Female: `${parseInt(schoolEntry['Female'] || '0') / parseInt(schoolEntry['Total K-12'] || '0') * totalHS}`,
                            Male: `${parseInt(schoolEntry['Male'] || '0') / parseInt(schoolEntry['Total K-12'] || '0') * totalHS}`,
                            'Total-HS': `${totalHS}`,
                            CSCourses: schoolCSOfferInput.filter(d => d['School Name'] === schoolEntry['School Name'])
                        };
                    }).filter(d => parseInt(d['Total-HS']) > 0);
                    stateUpdateWrapperUseJSON(schoolDemographic, schoolDemoCopy, setSchoolDemographic);
                    console.log(schoolDemographic);
                });
            });


    }, []);


    return <TableContainer component={Container}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>School Name</TableCell>
                    <TableCell >Total Students</TableCell>
                    <TableCell>CS Enrollment</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {store.selectedDistricts.length > 0 ?
                    schoolDemographic
                        .filter(d => store.selectedDistricts.includes(d['LEA Name']))
                        .map((schoolEntry) => <SchoolRow key={schoolEntry['School Name']} schoolEntry={schoolEntry} />)

                    : schoolDemographic.map((schoolEntry) => <SchoolRow key={schoolEntry['School Name']} schoolEntry={schoolEntry} />)}
            </TableBody>
        </Table>
    </TableContainer>;
};

export default observer(SchoolTable);