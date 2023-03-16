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
            } else {
              skillsBox.style.animationName = "homeskillsBoxAnimationOff";
            }
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
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyBgVGQ2bi6XyUGFV95s2ItFx_1MJUP-Jl-w&usqp=CAU" 
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
                <img src="data:image/jpeg;base64,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"
                 alt="Face3" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdk66jVFjrVDNnunEcr68uVhBYoBGULppgAw&usqp=CAU" 
                alt="Face4" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKxaBUpwOB88N7iOnetGtGaCsQnkEdYj2UkA&usqp=CAU" 
                alt="Face5" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv368u_xFgCkrQDDMUU4OY74kTuFljz9Kfjw&usqp=CAU" 
                alt="Face6" />
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


             <YoutubeCard image = "https://i.ibb.co/M6kTKMp/Screenshot-2023-03-14-at-12-56-13-PM.png"
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












