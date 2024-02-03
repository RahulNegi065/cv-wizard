import './App.css'
import { Routes, Route, BrowserRouter, useNavigate, Link } from 'react-router-dom'
import Cv from './components/Cv'
import AdminTool from './components/AdminTool'
import { Button, Stack, TextField } from '@mui/material'
import {useState } from 'react'
import { login, register } from './services/LocalStorage'

function App() {
  
  return (
    <>
      <h1 style={{fontSize:'2.2rem',lineHeight:'2.5rem',marginBlock:'10px'}}>CV Wizard</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cv' element={<Cv />} />
          <Route path='/admin' element={<AdminTool />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistration = () => {
    register(username, password);
    alert("Registration successful!");
  }

  const handleLogin = () => {
    const res = login(username, password);
    if(res) {
      alert("Login successful!");
      navigate('/cv')
    } else alert("User not found!");
  }

  return (
    <>
      <Link to={'/cv'}>View Demo</Link>
      <TextField style={{marginBlock:'100px 10px'}} fullWidth id="username" label="Username" variant="outlined" size="small" 
        placeholder="Enter username here" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField fullWidth id="password" label="Password" variant="outlined" size="small" 
        placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Stack direction={'row'} alignItems={'center'} marginTop={2} spacing={4}>
        <Button fullWidth variant="contained" color="primary" disabled={!username || !password} onClick={handleRegistration}>Register</Button>
        <Button fullWidth variant="contained" color="primary" disabled={!username || !password} onClick={handleLogin}>Login</Button>
      </Stack>
    </>
  );
};