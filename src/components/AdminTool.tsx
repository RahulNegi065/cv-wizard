import { useEffect, useState } from "react"
import { Box, Stack, Tab, Tabs } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CustomSection from "./CustomSection";
import PersonalDetails from "./PersonalDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import { getInititalCvData, getUserStatus } from "../services/LocalStorage";
import { Link, useNavigate } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';

const AdminTool = () => {
  const navigate = useNavigate();
  const [personalData, setPersonalData] = useState({});
  const [professionalData, setProfessionalData] = useState({});
  const [sectionsData, setSectionsData] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    if(!getUserStatus()) {
      return navigate('/');
    }
    const data:any = getInititalCvData();
    if(!data) return; 
    console.log(data)
    setPersonalData(data.personal);
    setProfessionalData(data.professional);
    setSectionsData(data.sections);
  }, [])

  const handlePersonalChange = (newState: any) => {
    setPersonalData(newState);
  };

  const handleProfessionalChange = (newState: any) => {
    setProfessionalData(newState);
  };
  
  const handleSectionsChange = (newState: any) => {
    setSectionsData(newState);
  };
  
  const handleTabsChange = (event:React.SyntheticEvent, newValue:number) => {
    setActiveTab(newValue);
  }

  const TabPanel = (props:any) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <h2>Admin Tool</h2>
          <Link to={'/cv'}><ArticleIcon color='primary' sx={{verticalAlign: 'middle'}} /></Link>
        </Stack>
        <Grid container flexGrow={'100%'} border={1} borderColor={'lightGray'} marginBottom={'40px'}>
          <Grid xs={12} md={12}>
            <Tabs sx={{ borderBottom: 1, borderColor: 'divider'}} value={activeTab} onChange={handleTabsChange} aria-label="basic tabs example">
              <Tab sx={{ outline: 'none !important', flex: 1 }} label="Personal" value={0} />
              <Tab sx={{ outline: 'none !important', flex: 1 }} label="Professional" value={1} />
              <Tab sx={{ outline: 'none !important', flex: 1 }} label="Custom Section" value={2} />
            </Tabs>
          </Grid>
          <TabPanel value={activeTab} index={0}>
            <PersonalDetails personalData={personalData} onStateChange={handlePersonalChange}></PersonalDetails>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <ProfessionalDetails professionalData={professionalData} onStateChange={handleProfessionalChange}></ProfessionalDetails>
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <CustomSection sectionsData={sectionsData} onStateChange={handleSectionsChange}></CustomSection>
          </TabPanel>
        </Grid>  
    </>
  )
}

export default AdminTool