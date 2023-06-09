// import React from 'react'
// import { useEffect } from 'react';
import React, { useEffect } from "react";
import "./Home.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //for moon orbit control
import moonImage from "../../Images/moon.jpg";
import venusImage from "../../Images/venus.jpg";
import spaceImage from "../../Images/space2.jpg";
import { Typography } from "@mui/material";
// import { typography } from "@mui/system";
import TimeLine from "../TimeLine/TimeLine";
// import Timeline from "@mui/lab/Timeline";
import {
    SiCplusplus,
    SiReact,
    SiJavascript,
    SiMongodb,
    SiNodedotjs,
    SiExpress,
    SiCss3,
    SiHtml5,
    SiThreedotjs,
  } from "react-icons/si";

  import YoutubeCard from "../YoutubeCard/YoutubeCard";
  import { Link } from "react-router-dom";
import { MouseOutlined } from "@mui/icons-material";


  const Home = ({ timelines, youtubes, skills }) => {

    useEffect(() =>{

        const textureLoader = new THREE.TextureLoader();

        const moonTexture = textureLoader.load(moonImage);
        // moonTexture.magFilter = THREE.LinearFilter;
        const venusTexture = textureLoader.load(venusImage);
        // venusTexture.magFilter = THREE.LinearFilter;
        const spaceTexture = textureLoader.load(spaceImage);


        const scene = new THREE.Scene();           //1)first create a new scene.
        const camera = new THREE.PerspectiveCamera(
          75,                                      //perspective camera FOV(verticle field of view)
          window.innerWidth/window.innerHeight,  //aspect ratio of camera
          0.1,                                      //near number
          1000                                      // far number
        );

        camera.position.set(4, 4, 8);   //camera ki position

        const canvas = document.querySelector(".homeCanvas");
        const renderer = new THREE.WebGLRenderer({ canvas });


        const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
        const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);

        const venusGeometry = new THREE.SphereGeometry(3, 64, 64);
        const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
        const venus = new THREE.Mesh(venusGeometry, venusMaterial);
        venus.position.set(8, 5, 5);


        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(8, 5, 5);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.1);
        pointLight2.position.set(-8, -5, -5);

        // const lightHelper = new THREE.PointLightHelper(pointLight);
        // scene.add(lightHelper);

        scene.add(pointLight);
        scene.add(pointLight2);

        
        // const controls = new OrbitControls(camera, renderer.domElement); //moon orbit controller

        scene.add(moon);
        scene.add(venus);
        scene.background = spaceTexture;

        const constSpeed = 0.01;
        window.addEventListener("mousemove", (e)=>{
            if (e.clientX <= window.innerWidth / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y += constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y += constSpeed;
            }

            if (e.clientX > window.innerWidth / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y -= constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y -= constSpeed;
            }

            if (e.clientY > window.innerHeight / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y += constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y += constSpeed;
            }
        
            if (e.clientY <= window.innerHeight / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y -= constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y -= constSpeed;
            }
        })

        

        const animate = () => {    //recursion function for animation
            requestAnimationFrame(animate);
            moon.rotation.y += 0.001;   //ye rotate hota jayega
            venus.rotation.y += 0.001;
            renderer.setSize(window.innerWidth, window.innerHeight); //rendering part
            renderer.render(scene, camera);
          };
          animate();

          return window.addEventListener("scroll", () => {
            camera.rotation.z = window.scrollY * 0.001;
            camera.rotation.y = window.scrollY * 0.003;
      
            const skillsBox = document.getElementById("homeskillsBox");
      
            if (window.scrollY > 1500) {
              skillsBox.style.animationName = "homeskillsBoxAnimationOn";
            } 
            // else {
            //   skillsBox.style.animationName = "homeskillsBoxAnimationOff";
            // }
          });
        
    }, [])


    return(
        <div className='home'>
            <canvas className='homeCanvas'></canvas>

            <div className="homeCanvasContainer">
        <Typography variant="h1">
          <p>V</p>
          <p>R</p>
          <p>I</p>
          <p>N</p>
          <p>D</p>
          <p>A</p>
          
        </Typography>

        <div className="homeCanvasBox">
          {/* <Typography variant="h2">DESIGNER</Typography> */}
          <Typography variant="h2">DEVELOPER</Typography>
          <Typography variant="h2">STUDENT</Typography>
          {/* <Typography variant="h2">CONTENT CREATOR</Typography> */}
        </div>

        <Link to="/projects">VIEW WORK</Link>
      </div>

      <div className="homeScrollBtn">
        <MouseOutlined />
      </div>


            <div className="homeContainer">
                <Typography variant="h3">TIMELINE</Typography>
                <TimeLine timelines = {[1]}/>
                {/* <TimeLine timelines={timelines} /> */}

            </div>
            <div className="homeSkills">
            <Typography variant="h3">SKILLS</Typography>
            <div className="homeCubeSkills">
                <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
                <img src="data:image/png;base64,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" 
                alt="c++" />
                </div>

                {/* <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
                    <img src={skills.image1.url} alt="Face1" />
                </div> */}


                <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
                <img src="data:image/png;base64,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" 
                alt="javascript" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
                <img src="data:image/png;base64,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"
                 alt="mongodb" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
                <img src="data:image/png;base64,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"
                alt="react" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
                <img src="data:image/png;base64,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" 
                alt="node.js" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
                <img src="data:image/png;base64,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" 
                alt="solidity" />
                </div>

                
                {/* <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
                    <img src={skills.image2.url} alt="Face2" />
                </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            <img src={skills.image3.url} alt="Face3" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
            <img src={skills.image4.url} alt="Face4" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
            <img src={skills.image5.url} alt="Face5" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
            <img src={skills.image6.url} alt="Face6" />
          </div> */}
                
            </div>

            <div className="cubeShadow"></div>

            <div className="homeskillsBox" id="homeskillsBox">
                <SiCplusplus />
                <SiHtml5 />
                <SiCss3 />
                <SiJavascript />
                <SiMongodb />
                <SiExpress />
                <SiReact />
                <SiNodedotjs />
                <SiThreedotjs />
            </div>
        </div>

        <div className="homeYoutube">
        <Typography variant="h3"> Certifications</Typography>

        <div className="homeYoutubeWrapper">
            <YoutubeCard image = "https://i.ibb.co/HnyrbBp/Screenshot-2023-03-14-at-12-39-57-PM.png"
             title = "Web Development"
             url = "https://drive.google.com/file/d/1xkiEbVHmafOaZBYSY519pGGhx2IXIMlE/view?usp=sharing" />


             <YoutubeCard image = "https://i.ibb.co/HCd14bf/Screenshot-2023-03-14-at-12-56-13-PM.png"
             title = "Computer Networking"
             url = "https://drive.google.com/file/d/1NzAgOTC2FK10Mor1L_3H_dY0MF5_w1q3/view?usp=sharing" />



             <YoutubeCard image = "https://i.ibb.co/Hp5kfqb/Screenshot-2023-03-14-at-1-17-38-PM.png"
             title = "Virtusa Hackthon"
             url = "https://drive.google.com/file/d/1aEQHt4TVlw4IsWxbVPs8UtMe_Bpv7nbj/view?usp=sharing" />


             <YoutubeCard image = "https://i.ibb.co/wJV8p0x/Screenshot-2023-03-14-at-1-21-26-PM.png"
             title = "Intro To SQL"
             url = "https://drive.google.com/file/d/1T5zdHueUJJXgAFQenyz9lJ2-xzKRHtCv/view?usp=sharing" />

             {/* {youtubes.map((item) => (
            <YoutubeCard
              image={item.image.url}
              title={item.title}
              url={item.url}
              id={item._id}
              key={item._id}
            />
          ))} */}
        </div>
        </div>
    </div>
    );

};

export default Home;












