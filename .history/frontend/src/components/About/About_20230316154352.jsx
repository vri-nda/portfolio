import { Typography } from "@mui/material";
import React from "react";
import "./About.css";



const About = () => {
  return (
    <div className="about" >

        <div className="aboutContainer">
        <Typography variant="h5"> Through this portfolio, I hope to showcase my skills, knowledge, and experiences, and provide insights into my personal and professional growth. Thank you for taking the time to visit my page, and I look forward to connecting with you soon.</Typography>
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
                    wordSpacing: "3px",
                    lineHeight: "30px",
                    letterSpacing: "2px",
                    textAlign: "center",
                  }}
                  >  
                  My passion for <b>computers science engineering</b> started at a young age, and since then, I have been actively pursuing my dreams of becoming a <b>full stack web developer</b>. Throughout my academic journey, I have consistently maintained a strong academic record, achieving <b>9.2 CGPA</b> in my first year.
                  <br />
                  <br />
                  <br />
                  In my free time, I enjoy exploring new technologies and learning new skills which has helped me gain a deeper understanding of the industry and the latest trends.
                </Typography>
            </div>
        </div>
    </div>
  )
}

export default About



