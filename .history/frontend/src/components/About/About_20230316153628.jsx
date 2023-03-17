import { Typography } from "@mui/material";
import React from "react";
import "./About.css";



const About = () => {
  return (
    <div className="about" >

        <div className="aboutContainer">
        <Typography> Code is like humor. When you have to explain it, it’s bad.</Typography>
        </div>

        <div className="aboutContainer2">
            <div>
                <img src="https://i.ibb.co/vLkr9by/img.jpg"
                 alt="vrinda"
                 className="aboutAvatar"
                 />
                <Typography variant="h4" style={{ margin: "1vmax 0", color: "black" }} >Vrinda Sharma</Typography>
                {/* <Typography variant="h5" style={{ margin: "1vmax 0" }}>Aspiring full stack MERN developer</Typography> */}
                <Typography variant="h6" style={{ margin: "1vmax 0" }}>Second-year Btech CSE student</Typography>
                <Typography variant="h5" style={{ margin: "1vmax 0", textAlign: "center" }}> at VIT Bhoapl University</Typography>

            </div>


            <div>
                <Typography 
                style={{
                    wordSpacing: "2px",
                    lineHeight: "30px",
                    letterSpacing: "3px",
                    textAlign: "center",
                  }}
                  >  
                  My passion for computers applications started at a young age, and since then, I have been actively pursuing my dreams of becoming a <b>full stack web developer</b>. Throughout my academic journey, I have consistently maintained a strong academic record, achieving <b>9.2 CGPA</b> in my first year.
                </Typography>
            </div>
        </div>
    </div>
  )
}

export default About



