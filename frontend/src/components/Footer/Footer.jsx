import React from "react";
import "./Footer.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BsGithub, BsYoutube, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
        <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hello! My name is Vrinda Sharma, and I'm a 2nd-year Computer Science Engineering student with a passion for web development.
          I've always been fascinated by technology and its ability to bring people together and make their lives easier. 
        
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Me</Typography>
        </Link>
        </div>
        <div>
        <Typography variant="h6">Social Media</Typography>
        <a href="https://github.com/vri-nda" target="black">
          <BsGithub />
        </a>
        
        <a href="https://www.linkedin.com/in/vrinda-sharma-69b9b1237" target="black">
          <BsLinkedin />
        </a>

        <a href="https://www.instagram.com/vrinda_02.01/" target="black">
          <BsInstagram />
        </a>
        </div>
    </div>
  );
};

export default Footer;