import { useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { setProfessionalData } from "../services/LocalStorage";

const ProfessionalDetails: React.FC<any> = ({professionalData, onStateChange}) => {
    const [degree, setDegree] = useState('');
    const [college, setCollege] = useState('');
    const [startingYear, setStartingYear] = useState('');
    const [endingYear, setEndingYear] = useState('');
    const [courses, setCourses] = useState<string[]>(Array.from({length:6}, () => ''));
    const [role, setRole] = useState('');
    const [organization, setOrganization] = useState('');
    const [skills, setSkills] = useState<string[]>(Array.from({length:6}, () => ''));
    const [experience, setExperience] = useState('');
    const [tasks, setTasks] = useState<string[]>(Array.from({length:3}, () => ''));

    useEffect(() => {
        if(professionalData && Object.keys(professionalData).length) {
            setDegree(professionalData.degree);
            setCollege(professionalData.college);
            setStartingYear(professionalData.startingYear);
            setEndingYear(professionalData.endingYear);
            setRole(professionalData.role);
            setOrganization(professionalData.organization);
            setExperience(professionalData.experience);
            if(professionalData.courses) {
                const updatedCourses = professionalData.courses.concat(courses.slice(0, 6 - professionalData.courses.length));
                setCourses(updatedCourses);
            }
            if(professionalData.skills) {
                const updatedSkills = professionalData.skills.concat(skills.slice(0, 6 - professionalData.skills.length));
                setSkills(updatedSkills);
            }
            if(professionalData.tasks) {    
                const updatedTasks = professionalData.tasks.concat(tasks.slice(0, 3 - professionalData.tasks.length));
                setTasks(updatedTasks);
            }
        }
    }, [])

    const handleChangeCourses = (e:any, index:number) => {
        const updatedCourses = [...courses];
        updatedCourses[index] = e.target.value;
        setCourses(updatedCourses);
    }

    const handleChangeSkills = (e:any, index:number) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = e.target.value;
        setSkills(updatedSkills);
    }

    const handleChangeTasks = (e:any, index:number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = e.target.value;
        setTasks(updatedTasks);
    }

    const handleSaveDetails = () => {
        let updatedData:any = {
            degree,
            college,
            startingYear,
            endingYear,
            courses: courses.filter(res => res),
            skills: skills.filter(res => res),
            role,
            organization,
            experience,
            tasks: tasks.filter(res => res),
        };
        const updatedProfData:any = {...updatedData};
        setProfessionalData(updatedProfData);
        onStateChange(updatedProfData);
        alert("Updated successfully!")
    }

    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={12}>
                <h3 style={{color:'gray',marginBlock:'0',paddingBlock:'0', textAlign:'left'}}>Highest Qualification</h3>
            </Grid>
            <Grid xs={12} md={6}>
                <TextField fullWidth id="degree" label="Degree" placeholder="For ex: BCA, B.Tech, MCA, M.Tech, etc." variant="outlined" size="small"
                value={degree} onChange={(e) => setDegree(e.target.value)} />
            </Grid>
            <Grid xs={12} md={6}>
                <TextField fullWidth id="college" label="College" placeholder="For ex: University of Delhi, IP University, etc." variant="outlined" size="small"
                value={college} onChange={(e) => setCollege(e.target.value)} />
            </Grid>
            <Grid xs={12} md={6}>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Starting Year</InputLabel>
                    <Select
                        style={{textAlign: 'left'}}
                        label="Starting Year"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={startingYear}
                        onChange={(e) => setStartingYear(e.target.value)}
                    >
                        <MenuItem value={'2024'}>2024</MenuItem>
                        <MenuItem value={'2023'}>2023</MenuItem>
                        <MenuItem value={'2022'}>2022</MenuItem>
                        <MenuItem value={'2021'}>2021</MenuItem>
                        <MenuItem value={'2020'}>2020</MenuItem>
                        <MenuItem value={'2019'}>2019</MenuItem>
                        <MenuItem value={'2018'}>2018</MenuItem>
                        <MenuItem value={'2017'}>2017</MenuItem>
                        <MenuItem value={'2016'}>2016</MenuItem>
                        <MenuItem value={'2015'}>2015</MenuItem>
                        <MenuItem value={'2014'}>2014</MenuItem>
                        <MenuItem value={'2013'}>2013</MenuItem>
                        <MenuItem value={'2012'}>2012</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Ending Year</InputLabel>
                    <Select
                        style={{textAlign: 'left'}}
                        label="Ending Year"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={endingYear}
                        onChange={(e) => setEndingYear(e.target.value)}
                    >
                        <MenuItem value={'2024'}>2024</MenuItem>
                        <MenuItem value={'2023'}>2023</MenuItem>
                        <MenuItem value={'2022'}>2022</MenuItem>
                        <MenuItem value={'2021'}>2021</MenuItem>
                        <MenuItem value={'2020'}>2020</MenuItem>
                        <MenuItem value={'2019'}>2019</MenuItem>
                        <MenuItem value={'2018'}>2018</MenuItem>
                        <MenuItem value={'2017'}>2017</MenuItem>
                        <MenuItem value={'2016'}>2016</MenuItem>
                        <MenuItem value={'2015'}>2015</MenuItem>
                        <MenuItem value={'2014'}>2014</MenuItem>
                        <MenuItem value={'2013'}>2013</MenuItem>
                        <MenuItem value={'2012'}>2012</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid  xs={12} md={12}>
                <p style={{color:'gray',marginBlock:'0',paddingBlock:'0', textAlign:'left'}}>Courses</p>
            </Grid>
            {
                courses.map((course:any, i:number) => {
                    return (
                        <Grid key={i} xs={12} md={6}>
                            <TextField fullWidth id={`course${i+1}`} label={`Course ${i+1}`} placeholder="For ex: C++, Java, Python, etc." variant="outlined" size="small"
                            value={course} onChange={(e) => handleChangeCourses(e, i)} />
                        </Grid>
                    )
                })
            }
            <Grid  xs={12} md={12}>
                <h3 style={{color:'gray',marginBlock:'0',paddingBlock:'0', textAlign:'left'}}>Work Experience</h3>
            </Grid>
            <Grid xs={12} md={6}>
                <TextField fullWidth id="role" label="Role" placeholder="For ex: Frontend Developer, Backend Developer, etc." variant="outlined" size="small"
                value={role} onChange={(e) => setRole(e.target.value)} />
            </Grid>
            <Grid xs={12} md={6}>
                <TextField fullWidth id="organization" label="Organization" placeholder="For ex: Akhil Systems, Paytm, Zomato, etc." variant="outlined" size="small"
                value={organization} onChange={(e) => setOrganization(e.target.value)} />
            </Grid>
            <Grid xs={12} md={6}>
                <TextField fullWidth id="experience" label="Total Experience (in years)" placeholder="For ex: 1, 2, 3, 4, etc." variant="outlined" size="small"
                value={experience} onChange={(e) => setExperience(e.target.value)} />
            </Grid>
            <Grid  xs={12} md={12}>
                <p style={{color:'gray',marginBlock:'0',paddingBlock:'0', textAlign:'left'}}>Skills</p>
            </Grid>
            {
                skills.map((skill:any, i:number) => {
                    return (
                        <Grid key={i} xs={12} md={6}>
                            <TextField fullWidth id={`skill${i+1}`} label={`Skill ${i+1}`} placeholder="For ex: React, Angular, MongoDB, etc." variant="outlined" size="small"
                            value={skill} onChange={(e) => handleChangeSkills(e, i)} />
                        </Grid>
                    )
                })
            }
            <Grid  xs={12} md={12}>
                <p style={{color:'gray',marginBlock:'0',paddingBlock:'0', textAlign:'left'}}>Tasks/Responsibilities</p>
            </Grid>
            {
                tasks.map((task:any, i:number) => {
                    return (
                        <Grid key={i} xs={12} md={12}>
                            <TextField fullWidth multiline rows={2} id={`task${i+i}`} label={`Task ${i+1}`} variant="outlined" size="small"
                            value={task} onChange={(e) => handleChangeTasks(e, i)} />
                        </Grid>
                    )
                })
            }
            <Grid xs={12} md={12} alignItems={'center'} marginBlock={'20px'}>
                <Button variant="contained" color="primary" onClick={handleSaveDetails}>Save</Button>
            </Grid>
        </Grid>
    )
}

export default ProfessionalDetails