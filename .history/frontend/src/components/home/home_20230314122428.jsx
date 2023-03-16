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
                <TimeLine timelines = {[1,2]}/>
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
                <img src="data:image/jpeg;base64,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" 
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
            <YoutubeCard image = "https://www.udemy.com/certificate/UC-69231b0c-5c3f-4f3b-b442-a213171965a6/"
             title = "Web Development" />
             <YoutubeCard image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzvGSX3gJcyWlYooizsDmIfIJqvPjsn5FSRw&usqp=CAU"
             title = "sample video" />
             <YoutubeCard image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzvGSX3gJcyWlYooizsDmIfIJqvPjsn5FSRw&usqp=CAU"
             title = "sample video" />
             <YoutubeCard image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzvGSX3gJcyWlYooizsDmIfIJqvPjsn5FSRw&usqp=CAU"
             title = "sample video" />
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













