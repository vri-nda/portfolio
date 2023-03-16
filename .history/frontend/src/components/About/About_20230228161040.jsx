import { Typography } from "@mui/material";
import React from "react";
import "./About.css";



const About = () => {
  return (
    <div className="about" >

        <div className="aboutContainer">
        <Typography>this is a sample quote</Typography>
        </div>

        <div className="aboutContainer2">
            <div>
                <img src="https://i.ibb.co/vLkr9by/img.jpg"
                 alt="vrinda"
                 className="aboutAvatar"
                 />
                <Typography variant="h4" style={{ margin: "1vmax 0", color: "black" }} >Vrinda</Typography>
                <Typography variant="h5" style={{ margin: "1vmax 0" }}>Aspiring full stack MERN developer</Typography>
                <Typography variant="h5" style={{ margin: "1vmax 0", textAlign: "center" }}>I m a Btech student</Typography>

            </div>


            <div>
                <Typography 
                style={{
                    wordSpacing: "5px",
                    lineHeight: "50px",
                    letterSpacing: "5px",
                    textAlign: "right",
                  }}
                  >  
                    description
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Exercitationem harum ipsam eligendi similique non voluptates doloremque delectus quidem laudantium, minima cum!
                </Typography>
            </div>
        </div>
    </div>
  )
}

export default About



