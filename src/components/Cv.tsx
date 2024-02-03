import { Avatar, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Fragment, useEffect, useState } from 'react';
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { getInititalCvData } from '../services/LocalStorage'
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';

const cv = () => {
  const [cvData, setCvData] = useState<any>(null);

  useEffect(() => {
    let data:any = getInititalCvData();
    setCvData(data);
    console.log(data)
  }, [])
  

  return (
    <>
    {
     cvData 
     ?
     <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} marginBottom={'20px'} gap={2}>
        <h2>My CV</h2>
        <Link to={'/admin'}><EditIcon color='primary' sx={{verticalAlign: 'sub'}} /></Link>
      </Stack>
      <Grid container width={'60rem'} minHeight={'80rem'} marginBottom={'40px'} alignContent={'flex-start'} border={1} spacing={5} borderColor={'lightGray'} boxShadow={'0px 0px 3px gray'}>
        <Grid xs={12} md={12} height={'fit-content'} paddingBlock={4} paddingInline={3} marginLeft={5}
        marginTop={5} bgcolor={'#213547'} color={'white'}>
          <Stack direction={'row'} alignItems={'center'} textAlign={'left'} spacing={2}>
            <Avatar alt={cvData.personal.name ? cvData.personal.name : 'No File'}
              src={cvData.personal.image} sx={{width:80, height:80}}>
            </Avatar>
            <Stack direction={'column'} alignItems={'start'} textAlign={'left'} spacing={0.1}>
              <h2>
                {cvData.personal.name}
                <Divider sx={{width:'120%', borderWidth: '1px', borderColor:'white', marginBlock:'0px 8px !important'}} />
              </h2>
              <p>{cvData.personal.description}</p>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={4} md={4} paddingLeft={5}>
          <Stack direction={'column'} alignItems={'start'} textAlign={'left'} marginTop={'10px'} spacing={0.5}>
            <EmailIcon />
            <span style={{marginBlock:'0px 4px',fontWeight:'500'}}>{cvData.personal.email}</span>
            <PhoneAndroidIcon />
            <span style={{marginBlock:'0px 4px',fontWeight:'500'}}>{cvData.personal.phone}</span>
            <LocationOnIcon />
            <span style={{marginBlock:'0px 4px',fontWeight:'500'}}>{cvData.personal.city}, {cvData.personal.country}</span>
            <GitHubIcon />
            <span style={{marginBlock:'0px 4px',fontWeight:'500'}}>{cvData.personal.github}</span>
          </Stack>
          <Stack direction={'column'} alignItems={'start'} textAlign={'left'} marginTop={5} spacing={0.5}>
            <h2>Skills</h2>
            <Divider sx={{width:'80%', borderWidth:'1px', borderColor:'#213547', marginBlock:'0px 8px !important'}} />
            <div style={{display:'flex', gap:'10px', maxWidth: '80%', flexWrap: 'wrap'}}>
            {
              cvData.professional.skills.map((skill:string,i:number) => (
                <div key={i} style={{height:'fit-content', padding:'1px 16px 4px', color:'white', backgroundColor:'steelblue', borderRadius:'3px'}}>{skill}</div>
              ))
            }
            </div>
          </Stack>
          <Stack direction={'column'} alignItems={'start'} textAlign={'left'} marginTop={5} spacing={0.5}>
            <h2>Languages</h2>
            <Divider sx={{width:'80%', borderWidth:'1px', borderColor:'#213547', marginBlock:'0px 8px !important'}} />
            {
              cvData.personal.languages.map((lang:string,i:number) => (
                <span key={i} style={{color:'#213547',textTransform:'capitalize'}}>{lang}</span>
              ))
            }
          </Stack>
          <Stack direction={'column'} alignItems={'start'} textAlign={'left'} marginTop={5} spacing={0.5}>
            <h2>Interests</h2>
            <Divider sx={{width:'80%', borderWidth:'1px', borderColor:'#213547', marginBlock:'0px 8px !important'}} />
            <div style={{display:'flex', gap:'10px', maxWidth: '80%', flexWrap: 'wrap'}}>
            {
              cvData.personal.interests.map((interest:string,i:number) => (
                <div key={i} style={{height:'fit-content', padding:'2px 10px 4px', border:'2px solid #213547', color:'#213547', borderRadius:'3px'}}>{interest}</div>
              ))
            }
            </div>
          </Stack>
        </Grid>
        <Grid xs={8} md={8} paddingRight={5}>
          <Stack direction={'column'} alignItems={'start'} textAlign={'left'} spacing={0.5}>
            <h2>Work Experience</h2>
            <Divider sx={{width:'100%', borderWidth:'1px', borderColor:'#213547', marginBlock:'0px 8px !important'}} />
            <h4>{cvData.professional.role}</h4>
            <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={2}>
              <b color='black'>{cvData.professional.organization}</b>
              <span>({cvData.professional.experience} years)</span>
            </Stack>
            <i>Tasks/Responsibilities</i>
            <ul style={{paddingLeft:20, listStyle:'outside'}}>
            {
              cvData.professional.tasks.map((task:string,i:number) => (
                <li key={i}>{task}</li>
              ))
            }
            </ul>
          </Stack>
          <Stack direction={'column'} alignItems={'start'} textAlign={'left'} marginTop={5} spacing={0.5}>
            <h2>Education</h2>
            <Divider sx={{width:'100%', borderWidth:'1px', borderColor:'#213547', marginBlock:'0px 8px !important'}} />
            <h4>{cvData.professional.degree}</h4>
            <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={2}>
              <b color='black'>{cvData.professional.college}</b>
              <span>({cvData.professional.startingYear} - {cvData.professional.endingYear})</span>
            </Stack>
            <i>Courses</i>
            <ul style={{paddingLeft:20,listStyle:'outside',display:'flex',width:'100%',flexWrap:'wrap'}}>
            {
              cvData.professional.courses.map((course:string,i:number) => (
                <li key={i} style={{width:'50%'}}>{course}</li>
              ))
            }
            </ul>
          </Stack>
          <Stack direction={'column'} alignItems={'start'} textAlign={'left'} marginTop={5} spacing={0.5}>
            {
              cvData.sections.map((section:any, i:number) => (
                <Fragment key={i}>
                <h2 style={i>0 ? {marginTop:'40px'}:{marginTop:'0'}}>{section.title}</h2>
                <Divider sx={{width:'100%', borderWidth:'1px', borderColor:'#213547', marginBlock:'0px 8px !important'}} />
                <b color='black'>{section.subtitle}</b>
                {
                  (section.fromDate && section.toDate) ?
                  <span>
                    {
                    dayjs(section.fromDate).toDate().toLocaleDateString('usa',{month:'short',year:'numeric',})
                    }
                    &nbsp;-&nbsp; 
                    {
                      dayjs(section.toDate).toDate().toLocaleDateString('usa',{month:'short', year:'numeric',})
                    }
                  </span> : null
                }
                {
                  (() => {
                    switch (section.contentType) {
                      case 'text': return (
                        <p>{section.content}</p>
                      );
                      case 'tabs': return (
                        <div style={{display:'flex', gap:'10px', flexWrap: 'wrap'}}>
                          {section.tabs.map((point:any, i:number) => (
                            // { 
                            point.length ? 
                              <div key={i} style={{height:'fit-content', padding:'1px 16px 4px', color:'white', backgroundColor:'steelblue', borderRadius:'3px'}}>
                                {point}
                              </div> : null
                            // }
                          ))}
                        </div>
                      )
                      case 'keypoints': return (
                        <ul style={{paddingLeft:20, listStyle:'outside'}}>
                          {  
                            section.keypoints.map((point:any, i:number) => (
                              point.length ?
                              <li key={i}>{point}</li> : null
                            ))
                          }
                        </ul>
                      );
                      case 'subsection': return ( 
                        section.subsections.map((subsection:any, i:number) => (
                          <Fragment key={i}>
                            <h4>{subsection.title}</h4>
                            <p>{subsection.content}</p>
                          </Fragment>
                        ))
                      )
                    }
                  })()
                }
                </Fragment>
              ))
            }
          </Stack>
        </Grid>
      </Grid> 
     </>
     :
     <Grid container width={'60rem'} height={'80rem'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} border={1} spacing={5} borderColor={'lightGray'} boxShadow={'0px 0px 3px gray'}>
        <h2 style={{color:'gray',marginBlock:'0',paddingBlock:'0', textAlign:'left', marginTop:'20px'}}>No CV Found!</h2>
        <span><Link to={'/admin'}>Make your CV here</Link></span>
     </Grid>
    }
    </>
  )
}

export default cv