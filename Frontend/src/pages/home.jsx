import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField, Snackbar, Alert } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [generatedMeetingCode, setGeneratedMeetingCode] = useState("");
    const [showCopyAlert, setShowCopyAlert] = useState(false);

    const {addToUserHistory} = useContext(AuthContext);
    
    // Generate random meeting code
    const generateMeetingCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11);
        return randomCode;
    };

    const handleCreateMeeting = async () => {
        const newMeetingCode = generateMeetingCode();
        setGeneratedMeetingCode(newMeetingCode);
        await addToUserHistory(newMeetingCode);
        navigate(`/${newMeetingCode}`);
    };

    const handleCopyMeetingCode = () => {
        if (generatedMeetingCode) {
            const meetingUrl = `${window.location.origin}/${generatedMeetingCode}`;
            navigator.clipboard.writeText(meetingUrl).then(() => {
                setShowCopyAlert(true);
            });
        }
    };

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>

            <div className="navBar">

                <div style={{ display: "flex", alignItems: "center" }}>

                    <h2>SyncMeet</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={
                        () => {
                            navigate("/history")
                        }
                    }>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button>
                </div>


            </div>


            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>For Quality video call</h2>

                        <div style={{ display: 'flex', gap: "10px", marginBottom: "30px" }}>
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                        </div>

                        <div style={{ borderTop: "2px solid #ccc", paddingTop: "20px" }}>
                            <h3>Create a New Meeting</h3>
                            <Button 
                                onClick={handleCreateMeeting} 
                                variant='contained' 
                                color='success'
                                size='large'
                                sx={{ marginBottom: "15px" }}
                            >
                                + Create Meeting
                            </Button>
                            {generatedMeetingCode && (
                                <div style={{ 
                                    backgroundColor: "#f5f5f5", 
                                    padding: "15px", 
                                    borderRadius: "8px",
                                    marginTop: "15px"
                                }}>
                                    <p><strong>Meeting Link:</strong></p>
                                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                                        <TextField 
                                            value={`${window.location.origin}/${generatedMeetingCode}`} 
                                            variant='outlined' 
                                            size='small'
                                            disabled
                                            fullWidth
                                        />
                                        <IconButton onClick={handleCopyMeetingCode} title="Copy meeting link">
                                            <FileCopyIcon />
                                        </IconButton>
                                    </div>
                                    <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
                                        Share this link with your friends to join the meeting
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
            </div>

            <Snackbar 
                open={showCopyAlert} 
                autoHideDuration={3000} 
                onClose={() => setShowCopyAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowCopyAlert(false)} severity="success" sx={{ width: '100%' }}>
                    Meeting link copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    )
}


export default withAuth(HomeComponent)