import { Typography } from "@mui/material";
import React from "react";
import "./About.css";



const About = () => {
  return (
    <div className="about" >

        <div className="aboutContainer">
        {/* <Typography> Code is like humor. When you have to explain it, it’s bad.</Typography> */}
        </div>

        <div className="aboutContainer2">
            <div>
                <img src="https://i.ibb.co/vLkr9by/img.jpg"
                 alt="vrinda"
                 className="aboutAvatar"
                 />
                <Typography variant="h4" style={{ margin: "1vmax 0", color: "black" }} >Vrinda Sharma</Typography>
                <Typography variant="h5" style={{ margin: "1vmax 0" }}>Aspiring full stack MERN developer</Typography>
                <Typography variant="h5" style={{ margin: "1vmax 0", textAlign: "center" }}>I am a Btech CSE student</Typography>

            </div>


            <div>
                <Typography 
                style={{
                    wordSpacing: "4px",
                    lineHeight: "25px",
                    letterSpacing: "3px",
                    textAlign: "justify",
                  }}
                  >  
                  Born and raised in Jaipur, Rajasthan.
                  <br />
                    I'm ambitious and I love new challenges.
                    <br /> 
                    My vast variety of skills is continuously expanding.
                </Typography>
            </div>
        </div>
    </div>
  )
}

export default About



