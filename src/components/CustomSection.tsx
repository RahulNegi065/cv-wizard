import { useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import { addNewSection, deletePrevSectionByIndex, updatePrevSectionByIndex } from "../services/LocalStorage";

const CustomSection: React.FC<any> = ({sectionsData, onStateChange}) => {
    const [prevSections, setPrevSections] = useState<any>([])
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [fromDate, setFromDate]:any = useState(null);
    const [toDate, setToDate]:any = useState(null);
    const [contentType, setContentType] = useState('text');
    const [content, setContent] = useState('');
    const [tabs, setTabs] = useState<string[]>(Array.from({length:10}, () => ''));
    const [keypoints, setKeypoints] = useState<string[]>(Array.from({length:4}, () => ''));
    const [subsections, setSubsections] = useState<any[]>(Array.from({length:3}, () => ({title:'',content:''})));

    useEffect(() => {
      if(sectionsData && sectionsData.length) {
        console.log(sectionsData);
        setPrevSections(sectionsData);
      }
    }, [])

    const resetToDefaults = () => {
      setTitle('');
      setSubtitle('');
      setFromDate(null);
      setToDate(null);
      setContentType('text');
      setContent('');
      setTabs(Array.from({ length: 10 }, () => ''));
      setKeypoints(Array.from({ length: 4 }, () => ''));
      setSubsections(Array.from({length:3}, () => ({title:'',content:''})));
    };

    const handleChangeInTabs = (e:any,index:number) => {
      const updatedTabs = [...tabs];
      updatedTabs[index] = e.target.value;
      setTabs(updatedTabs);
    }

    const handleChangeInKeypoints = (e:any,index:number) => {
      const updatedKeypoints = [...keypoints];
      updatedKeypoints[index] = e.target.value;
      setKeypoints(updatedKeypoints);
    }

    const handleChangeInSubsections = (e:any,index:number,target:string) => {
      const updatedSubsections = [...subsections];
      if(target==='title') {
        updatedSubsections[index].title = e.target.value;
      } else {
        updatedSubsections[index].content = e.target.value;
      }
      setSubsections(updatedSubsections);
    }

    const handlePrevSectionsChange = (newValue:any, sectionIndex:number, target:string, i?:number) => {
      const updatedPrevSections:any = [...prevSections];
      if(target==='title') updatedPrevSections[sectionIndex].title = newValue;
      else if(target==='subtitle') updatedPrevSections[sectionIndex].subtitle = newValue;
      else if(target==='fromDate') updatedPrevSections[sectionIndex].fromDate = newValue;
      else if(target==='toDate') updatedPrevSections[sectionIndex].toDate = newValue;
      else if(target==='content') updatedPrevSections[sectionIndex].content = newValue;
      else if(target==='tabs' && i!==undefined) updatedPrevSections[sectionIndex].tabs[i] = newValue;
      else if(target==='keypoints' && i!==undefined) updatedPrevSections[sectionIndex].keypoints[i] = newValue;
      else if(target==='subsectionTitle' && i!==undefined) updatedPrevSections[sectionIndex].subsections[i].title = newValue;
      else if(target==='subsectionContent' && i!==undefined) updatedPrevSections[sectionIndex].subsections[i].content = newValue;
      setPrevSections(updatedPrevSections);
    }

    const handlePrevSectionsUpdate = (i:number) => {
      let updatedSections = [...sectionsData];
      updatedSections[i] = {...prevSections[i]}
      updatePrevSectionByIndex(updatedSections[i], i);
      onStateChange(updatedSections);
    }

    const handlePrevSectionsDelete = (i:number) => {
      let updatedPrevSections = [...prevSections];
      updatedPrevSections.splice(i,1);
      deletePrevSectionByIndex(i);
      onStateChange([...updatedPrevSections]);
      alert("Deleted successfully!")
    }

    const handleSaveDetails = () => {
      let newSection:any = {
        title,
        subtitle,
        fromDate,
        toDate,
        contentType,
        content,
        tabs,
        keypoints,
        subsections,
      };
      const updatedPrevSections:any[] = [...prevSections, newSection];
      addNewSection(newSection);
      onStateChange(updatedPrevSections);
      resetToDefaults();
    }

  return (
    <>
    <Grid container spacing={3}>
      <Grid xs={12} md={12} textAlign={'left'} paddingBlock={0}>
        <h3 style={{color:'gray',marginBlock:'0',paddingBottom:'0'}}>Add New Section</h3>
      </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth id="title" label="Title" variant="outlined" size="small"
                  value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth id="subtitle" label="Subtitle" variant="outlined" size="small"
                  value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid xs={12} md={6}>
                  <DatePicker 
                    slotProps={{textField: {size:"small",fullWidth:true}}} 
                    label="From" maxDate={fromDate ? dayjs(toDate).subtract(1,'day') : null} 
                    value={fromDate} onChange={(newValue) => setFromDate(newValue || '')} 
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <DatePicker 
                    slotProps={{textField: {size:"small",fullWidth:true}}}
                    label="To" minDate={toDate ? dayjs(fromDate).add(1,'day') : null} maxDate={dayjs()} 
                    value={toDate} onChange={(newValue) => setToDate(newValue || '')} 
                  />
                </Grid>
              </LocalizationProvider>
              <Grid xs={12} md={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    style={{textAlign: 'left'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={contentType}
                    label="Type"
                    onChange={(e) => setContentType(e.target.value)}
                  >
                    <MenuItem value={'text'}>Text</MenuItem>
                    <MenuItem value={'tabs'}>Tabs</MenuItem>
                    <MenuItem value={'keypoints'}>Keypoints</MenuItem>
                    <MenuItem value={'subsection'}>Sub-Section</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                (() => {
                  switch (contentType) {
                    case 'text': return (
                      <Grid xs={12} md={12}>
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          label="Content"
                          multiline
                          rows={4}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </Grid>
                    );
                    case 'tabs': return (
                      <>
                        {tabs.map((tab:string, i:number) => (
                          <Grid key={i} xs={6} md={3}>
                            <TextField
                              fullWidth
                              size="small"
                              id={`outlined-multiline-static-${i}`}
                              label={`Tab ${i + 1}`}
                              value={tab}
                              onChange={(e) => handleChangeInTabs(e, i)}
                            />
                          </Grid>
                        ))}
                      </>
                    );
                    case 'keypoints': return (
                      <>
                        {keypoints.map((keypoint:string, i:number) => (
                          <Grid key={i} xs={12} md={12}>
                            <TextField
                              fullWidth
                              size="small"
                              id={`outlined-multiline-static-${i}`}
                              label={`Point ${i + 1}`}
                              multiline
                              rows={3}
                              value={keypoint}
                              onChange={(e) => handleChangeInKeypoints(e, i)}
                            />
                          </Grid>
                        ))}
                      </>
                    );
                    case 'subsection': return (
                      <Grid container spacing={2}>
                        {subsections.map((subsection:any, i:number) => (
                          <Grid container spacing={2} xs={12} md={12} key={i}>
                            <Grid>
                              <h3 style={{color:'gray',marginBottom:'0',paddingBottom:'0'}}>Sub-section {i+1}</h3>
                            </Grid>
                            <Grid xs={12} md={12}>
                              <TextField
                                fullWidth
                                size="small"
                                id={`outlined-multiline-static-${i}`}
                                label={`Title`}
                                value={subsection.title}
                                onChange={(e) => handleChangeInSubsections(e, i, 'title')}
                              />
                            </Grid>
                            <Grid xs={12} md={12}>
                              <TextField
                                fullWidth
                                id={`outlined-multiline-static-${i}`}
                                label={`Content`}
                                multiline
                                rows={4}
                                value={subsection.content}
                                onChange={(e) => handleChangeInSubsections(e, i, 'content')}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    );
                    default: return (
                      <Grid xs={12} md={12}>
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          label="Content"
                          multiline
                          rows={4}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </Grid>
                    );
                  }
                })()
              }
              <Grid xs={12} md={12} alignItems={'center'} marginBlock={'20px'}>
                <Button variant="contained" color="primary" onClick={handleSaveDetails}>Add</Button>
              </Grid>
    </Grid>
    {
      prevSections.length ? (
        <>
        <Grid xs={12} md={12} textAlign={'left'} paddingBottom={0} marginBlock={'50px 20px'}>
          <h3 style={{color:'gray',marginBlock:'0',paddingBottom:'0'}}>Previously Added Sections ({prevSections.length})</h3>
        </Grid>
        {prevSections.map((section:any,index:number) => (
          <Grid key={index} container spacing={3} marginBottom={'50px'}>
              {index ? <Divider sx={{width:'100%', borderWidth:'2px', marginBlock:'0px 20px !important'}} /> : null}
              <Grid xs={12} md={12}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <h3 style={{color:'gray',marginBlock:'0',paddingBottom:'0'}}>&nbsp;&nbsp;{index+1}.</h3>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
                    <Button variant="outlined" onClick={() => handlePrevSectionsUpdate(index)}>Update</Button>
                    <IconButton aria-label="delete" onClick={() => handlePrevSectionsDelete(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth id="title" label="Title" variant="outlined" size="small"
                  value={section.title} onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'title')} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth id="subtitle" label="Subtitle" variant="outlined" size="small"
                  value={section.subtitle} onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'subtitle')} />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid xs={12} md={6}>
                  <DatePicker 
                    slotProps={{textField: {size:"small",fullWidth:true}}} 
                    label="From" value={dayjs(section.fromDate)} onChange={(newValue) => handlePrevSectionsChange(newValue, index, 'fromDate')} 
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <DatePicker 
                    slotProps={{textField: {size:"small",fullWidth:true}}}
                    label="To" value={dayjs(section.toDate)} onChange={(newValue) => handlePrevSectionsChange(newValue, index, 'toDate')} 
                  />
                </Grid>
              </LocalizationProvider>
              <Grid xs={12} md={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    style={{textAlign: 'left'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={section.contentType}
                    label="Type"
                    disabled
                  >
                    <MenuItem value={'text'}>Text</MenuItem>
                    <MenuItem value={'tabs'}>Tabs</MenuItem>
                    <MenuItem value={'keypoints'}>Keypoints</MenuItem>
                    <MenuItem value={'subsection'}>Sub-Section</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                (() => {
                  switch (section.contentType) {
                    case 'text': return (
                      <Grid xs={12} md={12}>
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          label="Content"
                          multiline
                          rows={4}
                          value={section.content}
                          onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'content')}
                        />
                      </Grid>
                    );
                    case 'tabs': return (
                      <>
                        {section.tabs.map((tab:string, i:number) => (
                          <Grid key={i} xs={6} md={3}>
                            <TextField
                              fullWidth
                              size="small"
                              id={`outlined-multiline-static-${i}`}
                              label={`Tab ${i + 1}`}
                              value={tab}
                              onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'tabs', i)}
                            />
                          </Grid>
                        ))}
                      </>
                    );
                    case 'keypoints': return (
                      <>
                        {section.keypoints.map((keypoint:string, i:number) => (
                          <Grid key={i} xs={12} md={12}>
                            <TextField
                              fullWidth
                              size="small"
                              id={`outlined-multiline-static-${i}`}
                              label={`Point ${i + 1}`}
                              multiline
                              rows={3}
                              value={keypoint}
                              onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'keypoints', i)}
                            />
                          </Grid>
                        ))}
                      </>
                    );
                    case 'subsection': return (
                      <Grid container spacing={2}>
                        {section.subsections.map((subsection:any, i:number) => (
                          <Grid container spacing={2} xs={12} md={12} key={i}>
                            <Grid>
                              <h3 style={{color:'gray',marginBottom:'0',paddingBottom:'0'}}>Sub-section {i+1}</h3>
                            </Grid>
                            <Grid xs={12} md={12}>
                              <TextField
                                fullWidth
                                size="small"
                                id={`outlined-multiline-static-${i}`}
                                label={`Title`}
                                value={subsection.title}
                                onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'subsectionTitle', i)}
                              />
                            </Grid>
                            <Grid xs={12} md={12}>
                              <TextField
                                fullWidth
                                id={`outlined-multiline-static-${i}`}
                                label={`Content`}
                                multiline
                                rows={4}
                                value={subsection.content}
                                onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'subsectionContent', i)}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    );
                    default: return (
                      <Grid xs={12} md={12}>
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          label="Content"
                          multiline
                          rows={4}
                          value={section.content}
                          onChange={(e) => handlePrevSectionsChange(e.target.value, index, 'content')}
                        />
                      </Grid>
                    );
                  }
                })()
              }
          </Grid>
        ))}
        </>
      ) : null
    }
    </>
  )
}

export default CustomSection