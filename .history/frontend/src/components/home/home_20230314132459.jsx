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
                <img src="data:image/jpeg;base64,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" 
                alt="Face1" />
                </div>

                {/* <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
                    <img src={skills.image1.url} alt="Face1" />
                </div> */}


                <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
                <img src="data:image/png;base64,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" 
                alt="Face2" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnYCtDJ61GB0E-53hRBj_McbGGBYgXJB4mw&usqp=CAU"
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












