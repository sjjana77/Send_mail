import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Container, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import Webcam from 'react-webcam';
import MyEditor from "./MyEditor";

const Form = () => {
    const webcamRef = useRef(null);
    const [formdata, setFormdata] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        subject: 'Applying for Full Stack Developer',
        content: `
        <h3><strong>Hi Sir/Mam,</strong></h3><p>I am Janardh,</p><p>I have almost 3.3 years of experience as a Sr. Full Stack Developer in I3matrix, expertise in the following languages and technologies:</p><ul><li><strong>React JS</strong></li><li><strong>Node JS</strong></li><li><strong>Next JS</strong></li><li><strong>Express JS</strong></li><li><strong>MySQL</strong></li><li><strong>PHP</strong></li><li><strong>Rest API</strong></li><li><strong>GitHub</strong></li><li><strong>AWS</strong></li><li><strong>Microservices</strong></li><li><strong>HTML</strong></li><li><strong>CSS</strong></li><li><strong>JavaScript</strong></li><li><strong>jQuery</strong></li><li><strong>Bootstrap</strong></li></ul><p>I possess strong logical skills, enabling me to adapt to new technologies and projects efficiently.</p><h3><strong>Professional Details</strong>:</h3><ul><li><strong>Total Experience:</strong> 3.3 years</li><li><strong style="color: rgba(0, 0, 0, 0.9);">Experience in React.js:</strong><span style="color: rgba(0, 0, 0, 0.9);"> </span>3.3 years</li><li><strong>Experience in Node.js:</strong> 3.3 years</li><li><strong style="color: rgba(0, 0, 0, 0.9);">Experience in JavaScript:</strong><span style="color: rgba(0, 0, 0, 0.9);"> </span>3.3 years</li><li><strong style="color: rgba(0, 0, 0, 0.9);">Experience in PHP:</strong><span style="color: rgba(0, 0, 0, 0.9);"> 4months</span></li><li><strong style="color: rgba(0, 0, 0, 0.9);">Experience in </strong><strong>Express JS</strong><strong style="color: rgba(0, 0, 0, 0.9);">:</strong><span style="color: rgba(0, 0, 0, 0.9);"> </span>3.3 years</li><li><strong style="color: rgba(0, 0, 0, 0.9);">Experience in MySQL:</strong><span style="color: rgba(0, 0, 0, 0.9);"> </span>3.3 years</li><li><strong>Current CTC:</strong> 7.14 LPA</li><li><strong>Expected CTC:</strong> 10 LPA</li><li><strong>Notice Period:</strong> 15-30 days</li><li><strong>Current Location:</strong> Chennai</li><li><strong>Preferred Location:</strong> Anywhere</li></ul><p>Kindly find the attached resume below for further reference.</p><p>Thank you for considering my application.</p><p><br></p><h3><strong>Best regards,</strong></h3><h3><strong>Janardh K,</strong></h3><h3><strong>9444395237</strong></h3>
        `,
        emailid: '',
        pdf: 'https://rapidgameshub.com/Janardh_K_i3matrixx.pdf',
        pdf_name: '',
        videoBlob: '',
        video_path: ''
    });
    const [recording, setRecording] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(30);
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setFormdata({ ...formdata, [name]: value });
    }

    const handleEditorChange = (value) => {
        setFormdata({ ...formdata, content: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdataa = new FormData();
            formdataa.append('firstname', formdata.firstname);
            formdataa.append('lastname', formdata.lastname);
            formdataa.append('mobile', formdata.mobile);
            formdataa.append('emailid', formdata.emailid);
            formdataa.append('pdf', formdata.pdf);
            formdataa.append('videoBlob', formdata.videoBlob);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}forms`, formdata);
            setResponseMsg('Email Sent Successfully');
            console.log(res);
        }
        catch (err) {
            console.log(err);
            setResponseMsg('Error submitting form');
        }

    }

    const handleUpload = async (e, type) => {
        let file;
        try {
            let formdataa = new FormData();
            if (type == "pdf") {
                file = e.target.files[0]
                formdataa.append('pdf', file);
            }
            else {
                formdataa.append('video', formdata.videoBlob);
            }
            const res = await axios.post(`${process.env.REACT_APP_API_URL}upload_${type}`, formdataa,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            if (type == "pdf") {
                setFormdata({ ...formdata, pdf: res.data, pdf_name: file.name });
            }
            else {
                setFormdata({ ...formdata, video_path: res.data });
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const startRecording = () => {
        setRecording(true);
        let timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setRecording(false);
                    handleStopRecording();
                }
                return prev - 1;
            });
        }, 1000);

        const videoStream = webcamRef.current.video.srcObject;
        const options = { mimeType: 'video/webm' };
        const mediaRecorder = new MediaRecorder(videoStream, options);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const videoBlob = new Blob(chunks, { type: 'video/webm' });
            setFormdata({ ...formdata, videoBlob: videoBlob });

        };

        mediaRecorder.start();
        setTimeout(() => {
            mediaRecorder.stop();
        }, 30000); // Record for 30 seconds
    };

    const handleStopRecording = () => {
        setSecondsLeft(30);
    };

    useEffect(() => {
        console.log(formdata);
    }, [formdata])

    useEffect(() => {
        if (formdata.videoBlob !== '') {
            setSecondsLeft(3);
            handleUpload("", "video");
        }
    }, [formdata.videoBlob]);


    return (
        <Container maxWidth="sm" >
            <Typography variant="h4" align="center" gutterBottom>
                Send Email
            </Typography>
            <form onSubmit={handleSubmit} style={{ margin: "20px" }} >
                <Grid container spacing={2}>
                    {/* <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="firstname"
                            label="First Name"
                            value={formdata.firstname}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="lastname"
                            label="Last Name"
                            value={formdata.lastname}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="mobile"
                            label="Mobile"
                            value={formdata.mobile}
                            onChange={handleChange}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>To Email</Typography>
                        <TextField
                            fullWidth
                            type="text"
                            name="emailid"
                            placeholder="To Email"
                            value={formdata.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>Subject</Typography>
                        <TextField
                            fullWidth
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formdata.subject}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>Content</Typography>
                        <MyEditor changefunction={handleEditorChange} valuee={formdata.content} />
                        {/* <TextField

                            rows={20}
                            fullWidth
                            type="text"
                            name="content"
                            placeholder="Content"
                            multiline
                            value={formdata.content}
                            onChange={handleChange}
                        /> */}
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '136px' }}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>Attachment</Typography>
                        <TextField
                            fullWidth
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleUpload(e, "pdf")}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Webcam
                            ref={webcamRef}
                        />
                        {recording && <Typography>Recording... {secondsLeft} seconds left</Typography>}
                        <Button
                            variant="contained"
                            type="button"
                            color="primary"
                            onClick={startRecording}
                            disabled={recording}
                        >
                            Start Recording
                        </Button>
                    </Grid> */}
                    <Grid item xs={12}>
                        {responseMsg && <Typography>{responseMsg}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Form;
