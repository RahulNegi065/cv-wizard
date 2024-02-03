import { useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { setPersonalData } from "../services/LocalStorage";

const PersonalDetails: React.FC<any> = ({personalData, onStateChange}) => {
    const profileRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState('')
    const [description, setDescription] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [github, setGithub] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [languages, setLanguages] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>(Array.from({length:5}, () => ''));

    useEffect(() => {
        if(personalData && Object.keys(personalData).length) {
            setProfile(personalData.image);
            setDescription(personalData.description);
            setFullName(personalData.name);
            setEmail(personalData.email);
            setPhone(personalData.phone);
            setGithub(personalData.github);
            setCity(personalData.city);
            setCountry(personalData.country);
            setLanguages(personalData.languages);
            if(personalData.interests) {
                const updatedInterests = personalData.interests.concat(interests.slice(0, 5 - personalData.interests.length));
                setInterests(updatedInterests)
            }
        }
    }, [])

    const onChangeInterest = (e:any, index:number) => {
        const updatedInterests = [...interests];
        updatedInterests[index] = e.target.value;
        setInterests(updatedInterests);
    }

    const handleUploadClick = () => {
        if(profileRef.current) profileRef.current.click();
    }

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
      
        if (selectedFile) {
          getBase64(selectedFile)
            .then((imageUrl) => {
              console.log(imageUrl);
              setProfile(imageUrl);
            })
            .catch((error) => {
              console.error(error);
            });
        }
    };
      
    const getBase64 = (file: any): Promise<string> => {
        return new Promise((resolve, reject) => {
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(file);
          } else {
            reject('No file provided');
          }
        });
    };

    const handleSaveDetails = () => {
        let updatedData:any = {
            image: profile,
            description: description,
            name: fullName,
            email,
            phone,
            github,
            city,
            country,
            languages,
            interests: interests.filter(res => res),
        };
        const updatedPersonalData:any[] = {...updatedData};
        setPersonalData(updatedPersonalData);
        onStateChange(updatedPersonalData);
        alert("Updated successfully!")
    }

  return (
    <Grid container spacing={3}>
        <Grid  xs={12} md={12} >
            <Stack direction={'row'} alignItems={'center'} spacing={4}>
                <Avatar alt='profile pic' src={profile} sx={{ width: 56, height: 56 }} />
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <input hidden type="file" name="image" id="profile" ref={profileRef} onChange={handleFileChange} />
                    <Chip clickable label={profile ? 'Change' : 'Upload'}  color="primary" onClick={handleUploadClick} />
                    <Chip sx={{ marginLeft: '6px' }} clickable label="Clear" onClick={() => setProfile('')} />
                </Stack>
            </Stack>
        </Grid>
        <Grid xs={12} md={12}>
            <TextField fullWidth multiline rows={2} id="description" label="Description" variant="outlined" size="small" placeholder="Highlight yourself here in short"
            value={description} onChange={(e) => setDescription(e.target.value)} />
        </Grid>
        <Grid xs={12} md={6}>
            <TextField fullWidth id="name" label="Full Name" variant="outlined" size="small"
            value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Grid>
        <Grid xs={12} md={6}>
            <TextField fullWidth id="email" label="Email" variant="outlined" size="small"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>
        <Grid xs={12} md={6}>
            <TextField fullWidth id="phone" label="Phone" variant="outlined" size="small"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Grid>
        <Grid xs={12} md={6}>
            <TextField fullWidth id="github" label="Github" variant="outlined" size="small"
            value={github} onChange={(e) => setGithub(e.target.value)} />
        </Grid>
        <Grid xs={12} md={6}>
            <TextField fullWidth id="city" label="City" variant="outlined" size="small"
            value={city} onChange={(e) => setCity(e.target.value)} />
        </Grid>
        <Grid xs={12} md={6}>
            <TextField fullWidth id="country" label="Country" variant="outlined" size="small"
            value={country} onChange={(e) => setCountry(e.target.value)} />
        </Grid>
        <Grid xs={12} md={6}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Languages</InputLabel>
                <Select
                    style={{textAlign: 'left'}}
                    label="Languages"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    value={languages}
                    onChange={(e) => setLanguages([...e.target.value])}
                >
                    <MenuItem value={'hindi'}>Hindi</MenuItem>
                    <MenuItem value={'english'}>English</MenuItem>
                    <MenuItem value={'german'}>German</MenuItem>
                    <MenuItem value={'french'}>French</MenuItem>
                    <MenuItem value={'spanish'}>Spanish</MenuItem>
                    <MenuItem value={'japanese'}>Japanese</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid  xs={12} md={12}>
            <p style={{color:'gray',marginBlock:'0',paddingBlock:'0', textAlign:'left'}}>Interests</p>
        </Grid>
        {
            interests.map((interest:string, i:number) => (
                <Grid key={i} xs={12} md={6}>
                    <TextField fullWidth id={`interest${i}`} label={`Interest ${i+1}`} variant="outlined" size="small"
                    value={interest} onChange={(e)=> onChangeInterest(e, i)} />
                </Grid>
            ))
        }
        <Grid xs={12} md={12} alignItems={'center'} marginBlock={'20px'}>
            <Button variant="contained" color="primary" onClick={handleSaveDetails}>Save</Button>
        </Grid>
    </Grid>
  )
}

export default PersonalDetails