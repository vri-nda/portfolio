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
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAADcCAMAAAC4YpZBAAAAh1BMVEX///9h2vta2ftW2Pvm+f7e9/5y3vvv+/5r3Ptj2/v7/v+u6/3z/P/P8/3L8v3i+P573/u07f2X5vye5/yK4/y+7/3X9f6Y5vyn6v2G4vzM8v2y7P287v2M3/bF8f7Y7vTK6vSs5PTg7fGB2PD29vaU0+Vw1vK13Oe91954xtxd0vKS3fLV5Oj1fiT0AAAS/ElEQVR4nO1dCXejOBIO4sZgMJchJkzPsb07Pfv/f9+qShxCByKJY5O3fG+mOx0DVqFSqW69vBw4cODAgQMHDhw4cODAgQMHDhw4cODAge8M3329VHXqv+umyKkvTVU70RcN6s6oy9AiFJblFXW87R4/Kbzxpqv7teO7B/zCokMdQKysM89oVAOJ801h4TxgoJ9B7dl0nDYDnRpiB42BzrqFKSTTTfTnoH7MaD+IGggLm8QFJJcMx29dVtaakyNdVnbBm+pzTv9BSPK4Mb8bjkdHmM3rKjozOlvdoKNbAJ+H13p+EQn9FfH2y7RRCUQuGDTuM2THRimG0hLnMV/Km5qSaRdfOM7PoVJOQg/TZXuv8vWXED4pU/H3r1QGBXudzIjyq6XgTb8AakgjrE4HZzmoFE860dd1+pIxfh41HVuu/CRBgq4Lrk08XLHKzTH26L65U/WgoctJswVEuAAzjjeBW4mda0ihvG/vVMzSCfO0H3awQUz8HOewrXpn3dVRQKf+3uO7C2Kq2K1Ixhp2mYDR5ePUlisCpiQk2yXL1rZS9kxIMyCzpz/FjMg1KgpiBRt14Mfi1TaI/6hAUfvbD5Q7zerDKv0afy4qSqVBZb2gEgCKObmsX+mGOxU/VMSaqHw5jYbH+kzSzTSwbK1seiKidgOVLzlaWKQ0XefvlMo4szZQWTEqO9N1vvedqSwYlUZd/FtT2YdsWYYmCr4zlQnMI8HpNFy5Vyo3SJ86BP38cgMtqF3f8/dKJaorq1T6oPyAfg42l2ChiNjrTvLSmbQCqtfZTK1LYTZXt8yUagUKu/v5OBuovFIiRzsDHUQq+3lEv1fTK1nXY3tYjNO/XBC0K4oqVaTILr3P1CYJ9QNLAyqCOSu6A0eY/qXs1ibx13SaCAROz/8GZqvVGl+UvfdpX0aezu3zgpJHEDdRsyaBqBVt1HWfg5ba95qPqFVGMoEDcXp1S9PboAU+B5TLLDWXuaHKooSlqZFXjsjf+wFIf8mDDGCeV8lbdUVXpVLGJJRK5aOeD1e5x0Wxm7GwXX7pOFxyFscr01hmgGLNHfhcgJDlPeJRWtfnS5mFQ2xyDN6RMezHfhtk5eVc1ylHK7Wh9yp8QGRYHtN+ovRctAEjZqIRInbCX+MncCWltjiz20/2fiMIf/0EBnytqyb3rIk6RoiXKeEtLqIIy6brCxBWvz+bHA1+sCA7IxCTBMKRKSs/VsLvZzrZeyFkeD/Z+5IvHoS0mYZL2S/M8qJ30ySzDAqri28i7NzkdC09wq1X77YzKRu5J2/iUJJ1cz4LONzXd77K5vZS3z032fQgklX7iWI6NypGCeNW+scbvzH0tjGs09INiDfCottAI/wftNUuONe9BjZbhxmy50JpizNCPINtUYsaA1WIKb+W2bC+veLZnBslJc6iHV4TBzIC6M/8mBpDhAhBVYCFyRZ7LHDtVGVo46yWzwyZRJU3vO7bwFaglXMjcunufjM+xqezxqvyCZVGwz/9G/sG63l01jiPJMz7eYjBwsbMiclXhwCtlbNA6F2zBRdXrcWSZZ4iiOKC7Y3LVdPwdmG/NTxHeZZMRFBFccnlbs7e5hOMlDOmIwWN8Ibp9jd5MpzQ0hqcS8QBmf0GVCyLAoslsdnXR4vbE6rgucRFVHJM2wK1rMKNfrjKmlx6EZ05yYUQseQo76FuPRZVDlWR1uu0FGtNnoGvmJF4FkBOQELF1hE3mJ+35t28M+KWCnhb7YE707Ewd3FJRgtlRlQ3HuyAtWhSwm3spZ1sTcZBjWvkcaYKJD9YJ7XzIx59XHQ/sIU3H3dDHiylv1/eDglBuBrjTLpthI8hXkOo/m6A7AC9wLsNLna6kMKlEKkzwhkgQv6hS9jWSldoqNszYlwoj3FGu/BV+kjN4DHobFEhQI7jrElBvWUaEHgJ2hcdMGlTWgZfAfymtYg5vPBrDrvIgin9cEGkJb4ESp8V/hmsvkEMH+qdvncEXW/r31MTZlBYy9GebEvEUmNoyGBXrvnUITpoPUDbo1MZrBoJkTfkgSxGC2mSAoQrnID9dl28nMkj/NGpOffhwqhc7uA1kai0rKUgYbNtWHbAs1+fVAq6qSFI7MO0iZGek4JKYcuAlWnKXMMwqfXlYrbYoIHDChO1lFJBpcic4Gy3TalA/iOCC/kGKuF1C3EexbKUqeyBSiMFnnm+P40tVKLDarksN1F5I7K+JCPckPr1WWzgWJa+LYgoFccK3Bmh3WHyLbi2Ph54N0DiqoGpmItVyKRQSR9h/0/QD2ja85tHxOLBNDYMhOXa2UvroVZw7PJFwB5hGQtJQAV8gPKTq4tGFuOw5OHGrTSZ9lKInIcJXhctzWPit24oVjkJ6AnzPwvDPYsanqB2o4oKN67yYx08SF2/riZ3oK88/P3iSflqV3EylxxxBjMladazneKAbJDC94ADcbdS+8LBMKNSxZEmM8oXYTzBQo0C5p+8rZVYxNmDTJKXgSVLHdsUwzDBXlxeE59m40tyVF0GxQ1SuXUbhfMw8xKAGpwm8QpGiVseZEWKTpo0Z/FJEhTCWJ0pxn5VuPAYoDKMmAMSd8MJBYxyfXRTNl5HFBlrfpWXZfEq8fscKzkrnGKA6IR1uo/0VfboV88VtkFORq2H7h3r9T8c0mDyzlGLRmVi1i06ZB8b/qpRGwulym7fI5P7ie4dWzXOnJvAQiF//CY0VYZ9CeICnfqewLYJ55wCvTTcNJk1vz8ksgHZY+U80ThHvxQuq8DPFsHiknDTl270EsfeIoMvI/xdGM0HGtvnBGshfAlSKLgmozRJlwmEVBivZU6MqJYBlTNHc9y3IQuRdk9LJI2xEB/THBidsPFzrxxWqTmACUES3jk7b5lxxToBkKx7akpw3LGsAjssL3X9D9DMM1ZCNgSjc3HvoOs5qNy6K0OWsdA+v0YxrtqQjC5YyWgEnjUIxl5cvYPL0hqTJ/aRpR+lTcZ1O+FrvDHRdT1vEAw13isYuZONRiCav4tEGIbILYLRsiJhe5369Diw3az6kTHCw+Sy7742ZTYnIWa3/SQ1DYhYNppljapqWaWOy9w9ejIjFjcIqjQpMjIl4cFTdtr/5o9fOJNBMGRy0R9HI6S8VIkfRwvEflKdxjdjhdZ0Ey5L8uezydEBMkeL1HfcWzZM6LzCbBJmWcshywJicxcgvLJzHacPdpw5GnGxxzhNLnnZ8kmSIyUT5jdgB1lb5rdk5NHEVAb2RDiyZzxykvNlTJIkAZ8LPLqhSdudayF1PWp3W06C2fmqOM3gCgkvziIB+My2RbFVDILqfMEuS4NYOEy5uzFn+z/ir0G82mrGdO2dNmVAJ12g/sT3VF4pcAZqzGzoSfKoZJB3YmUxQXBAdJpD/bDWkU73zrd7ju1uiIMVwdgMxcIzsJ5WG+/NyarP93lwVzN+c6FEBF2renOleERc/SNIbEuVQDcA4yTcS8iJ3ImLA0imHenpMwydbyC+Mn9+0Uue8fN9CtneUP1dcTXCoNysR32snda4n0z9CoqJTDeg165O1V77FURvJirjfGh9mEpF0hL22vkmMvcRibHDY99BeM6gjO+1w8aWbimYqYgeK5Mu/p2pHOPuZvflt6YSY5+m+jbAXqncsC5fRirNuZ97pRK0GSOVDrOozd0Z9ypjIb/MRKUz1VZu6RS3S63ApPuMfQvwPzs3tHWyvmfnm8HWCrs//kAnwXpYGWL6u/THOoaMcmw66uEVHTSP9dZyea97tbyi1cTVCBvIjpT14dxmVYlse07Cg1GutMUAHZbPbKuVrZ4n+BtSSJ+ElXJLVqNVcEQ57UrSEMjrvXZLcaTiiQExNnEOlzFzVs4UKLUgZ7VC6Mko1QaVy1J1xGmObthLpFCotIWhw9pTAUnOUrYE1vuqiakzSHAJpJwBKD8SOzvtCI20QTh5uFIEG7NkJW+ZHAWLeK+dmgDoQw+raRrcU6BO8ZowHNsRnKZ3E+MuU+xzG2FwccxekbhufWHBc2KvpyP1HksEyaC7ipsUmEO0071yhJuNbW+GRjZhaVJHo77l7mHdAfZNJFYFz+kPltekGwYcJ3kwRm2hH0m/dyJfgM4MQul2mBX1Zve401+z0Kb3eVc5eXan8J00dd492NhJnV1GDQ4cOHDgwIH/V0RuooL7XVSSbcjH0wsFBO1llx7SD8G3dKD69Hc4gXMTHC2VaEiJxXbfFAOVEtsOlpGd7W06448cZcuo9KjhzsOtuyFtngT7IrML7Q8clolUqsoco/PQ0sbUXvOhwK7t7+9FgVSqQ3R+q+pE8FxAOcoHGqshlbri42JL44SH4iuoZOdx7Slz/kuoHGTTflbml1A59HbZT7rj11Dpopjdj/xBKt+/ggxUvrSK5j1PRBpuSayRYKKy0VOZ1mi91GZPc+SzS5N6g+Kydu1f/4IVFPxmfIgAE5UnDZV+501HsXvNqn7k3DLLnq9dDzqf2/na7MTvYfX17e0n0zt//flGcdsuFD9GpXsN+IMPiFXq6IxfS4u/VD77mwN0x+UfS62i6Z24IX/WAsZYtqcifIRjWRySlRWOdYnhSX2+ylB2y1e0icH4CXVrkZmG4dpquLaX2iK9o12MicpcphIrnCw7yPvU8Z20yrGulrSKh5yGKsugvBbFNR9nSi0lu8E+oAZ8fr2WGAKck0dcgSUIeYfqaaCSNSBcUBmzvAEuESBizSLkwouGTfN12m+dhvVbVaURsDJb7mqXXTySmby9tcO6JD/btnxTc89HqOzwe3gjgB3+LOTVsQwQ8TERxqqXkWmHnawjVyQ0bNEuOp37BfxuajMSRUzGWv+G4txt9A3fuk4lWl98RxtWdyiJI9bgWjzBHA67lvQmnDOpz9QZX6eUkNCFZMFJv4Ub8sNlrFN5wxXHPxVlrmpZccXrE/zipnjlLK9r+QFbGYoerm65eMRX6D4dchef7eJoZVsE7cQ21YpCJy+xeQNbwWZ9+Qv02A67Fi44BmZM011C7LegB6zsZbEx9p/YMvrPUKm2k4f2t3zTMGyoptNqL8bGEwMqietZa68Nt36GSkUfBefm2YxIno0KsT8KjyjYxHRDK2h+YTKn8JZk509RaeWn22XGrWEtUSwhqxW/Qz9dzcYmzCk8ms9Jw8ndlKT2OSrF5gJjdssyabDWbOjzx5vGilTyDohSJ7glfI5KFYgdCh3vYRtZSckHGaJa4rEDmO8TqYTalI01CPemMvRK6Twm2CxWdF6UlOLqSm8t0+2t7Dr0tRGpZD7hTbGKT1IZjBj+/euH4mxD4KyVzlrnUMrMhiRLMqwIajEGqO65ApVwCtjGE1s/ReXPH47P4FRsk1T2aMGe417vKlFX8qaXoIZIrYySWhl5G9o2LPREoPIVdP1tNe6foTLk1wSeX6Vs6+oPESId8EN+CA2bxykDMepbmxT/+dtaUolNvrf1K7ifVtDpXM2OrRHIM2yeoSumgZ+5WYrqkvz69Rwq5Ta9FLLMG6jMiqY54X/DX8NP8MeJI5Jp4K0gdKMTe1XPphLLflSxrgiWrNwGRQfoEavq/8o0x8evS3EozEKQTQ8sT9uaYh7j1SqJfHqOjBWp9JlolBTLXGFD6p8c6DRwOD+Qp9JXmGIa3NXyOqt5VuecVeIVLlb3s4G3Jek+mypK7mtfovFhiwTVuj1GBTjmQNNppFhSyXhkU4r+falkveJFPYcd4rCxHBSVXjUbilT2sDBXeq8sx3VHXwEKQqlLL1q7G51L76AyDjU7tIQ7U4knTkiLkHkutmWNAMdqIp8ilUyob9HXkcr3h+C0fh+X9RwUHDlw2M/6iQETXvVGYylSyU7l2cAkBjteB713a+DZ5Uco9Fda6fNP1u4k+JClAGdfptqKl6YRygtznwRpLFoq1TzLhqOUh3W3fAx6AFTc3Yi+gkGFsCyZzMpbVFTF2Ony3RkAK57KlHl+BJGKe4wi9OPktr3sF5Koogovw4IVUzIc9mXCSQRpaQuNynHTeXe/tTV/bKGSszH7rXAKon8JJE8t6/4nFrf5V0lbR/TMo+DNJYAvMT50qZzctKy9hjUqmaInHkY1kEmyzmWERk5/ZVfmYlgABrmoEo5ePdnyYqiG1the09dO7Nfn03Do++L7E/a7a//j3HWb061WIwio6Mnb9YUduwKZwm9vb9BplI1PKqB1GfHtmQ0nTqvM9vr//i2vSxxKyyw7cJ2wP/CpS80vHrID0WzfcqIxAt633r1Y2CpF78Ut55K7KWisCqQ75VCFmOXFtQ2IbcGbgLJNpaV1WZ4miRwjPjXhLtnmEcMne0GmZfM4D4LAk1XuqC+DuU03/SEoXKUaGvXZ0HwbJmeMwJ7odyojKmmxfGx2kd9/NaQ00D9V1dc6Svy1a8HjpfzASQqW+kG8skn0KySqC8wmIV7eT1fpv9Ovb+AEs+0wy2+18irnBA+0skY67vZrEEFJ4pa60ncWIfqmx/rORzKeDxw4cODAgQMHDhw48FT8D16xz6WIea+DAAAAAElFTkSuQmCC"
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












