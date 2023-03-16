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
                <img src="data:image/jpeg;base64,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"
                 alt="mongodb" />
                </div>


                <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////v7+5h2vzu7u339/f+/v7y8vL5+flb2fxR2Pz08O328O1M1/xV2Pzy7+5r3Pv3/P173vrH7PaP4vrb7PHn7u/y+/778eyd5frC7/zg7fCm5fhl3Py76fY+1fyx5fXk+P/T8/247f6V4ffS6/Lc9fyk6P133vrL8f235vSw6/3/+/bE6PTU6fDU8vrp9/tsuMEwAAAgAElEQVR4nO1daXvqOq8loRTbcRxCEuapDIVCW/7/v7ueZDsjgXZv9nue63M+dIew0IodW5IludOB9uLp9mouwZXuC1zpdeFSDy71zaV/Esrr/B7Wf54hY78DxUT79xgyks2+NqKNBj+AkjBf+/3XZtT7pxiS8ecu9jGlNKRRPJm+BoQ9AtVb7o4LjkFDvEjm3/8MQ5atEUU+NIQojZep5HgP1HUar2hoYPgDW5x6/wbDYeTIpVnSRTLz2B1Q152PUQklGf0LDM8lyXQXJMOAtIR6S1a4EgSvg19k2NXNwYJLDhY0wJpUiia7ACdpCyiPbY64NAqg0TV7RCrOEFrnxbQ+NLjwWrpSumk8oXWy8Rbi98stqN44CSsHAXTj+nK3VLlLts/7DX3+oi91bZ+/ykVi7fYg4q00zD6aoXrTcv/lYej3vVLlRnDnPobOqH4VBDNLMAz9KI4jPjbzNMMkY/VQoyQ/BsSkzGH40mOQ0bF3n1Sy/RJDLwEyaLX77gS8ZfvlJHInfd4jfLaogdrmBihfZibTw0VKNZybCYzOn8aQfEIHoMWGX5I3McK6+4nvcqTrjFVBbZLcGMfxaQB3dRlLY8BAm2cxHEcIumnUAYYK6vq+cjjSo51UDVRwcB8DosehIxa/iXmxhg93T2LI9roLUTQCsSxUb+68jwh/F6G685Xbzck+YHmG/C1faIRV7zkMyUQLQKdWLAfqENtBiMJzDooxd4TixdJjObHkTeRLP0J6fgrDbhZBF7piuVBLR92hiQNFuo6mxzWDGZHfKzD0mJ7JUNJeKn2Tw/AVWr+nW7986cVcgiu9V7LXvYCmcKn0vauzGNBkAFBk7zsjeDEl+nsvFl02sofbrm2lei1BWaqttLaOox9NoBvgtgqoy9laHThKiYJ6cwjSOKtStXTTN9JP1laqWqgHNG89k4aJVo6rXQ9XOx6RvycCauu8n3g4bvJi6FtRTJ5gW1ygaz5ZE8POwM4pCKXsxSUYRkPW6Kc56McTBU9geICZ9KuZIV83zLqA/E8+bu0cGmek2RN1hVuzJzDcakkXs6JYJaitfe0WzhKCE8aqxTJQA73q42FbU/M3GeoBFGc3GXbe7OruzDFzVieWhdJrLvp4AsOz/u0duc2wc12UbEC6hNHdxFCPabz++wz7O81w0oZhZ1+kSN/AP9HIcKoYot9g+Hrneqj1jXBNSitPBRRJ84YSOrRbxIDh5PH1EKh6Vqcxl4xe4HQKaAqvmiFXSuFSI1TnGjt6TPRFHCi4ySgiBooNNcN5S6lKUL3H9dLIMDRPshnq21kmzuMKdbmkl3KGqWaY9NtJVYb6ewy/3VEqvIQlsYq2hWB4eIzhb9gWg/sYdq4477BwFrgmhg/24a9YT8k9DNngWJhL0b4Vw+HzGYbvbRh6Jc8/8o0QDQwJzKXzJ1jA9zBkxilnfTPhsQVDtlQMwycwJGslK2rDcG6mUTQ3FLlJfJMhWWudZvs4Q7MyOmKV1k9j0lYw3PVuQZFPo23T82Vu/oH1wzEKQnkJD/S2SLhtJ1UFlLNvcV/rr2EOuHnnzOjddM3/ac2n1fRy47sXrXnjbf/GnbXNodpGa3Oe5En3BbeeiqpWHmqzMEM0kTa+fSnxnjRrbaAb5myLJqnqoR63gLndri/VQBkbP0wUVA88yT5apM02/iDWj+IZ9uEIRt4NG9/svyHfYxrKOItRdMPG1/2PZs/YA9Y9gZsZvlkvzZ4B1MGO0wlpYriBx8OewVDbCiEYiJUMN0ZZC5fEQk0Nb365yROlp7OneKLAXxomTQzNK0fXOb/21oxdmjUwPGP4jWcw1Pu//PnWMez2380sE4/zUHbv7Gj21MoMYZzMf4UhXGuLBe8ImpUY6rvI0vRU7Om3FaBGRhXHu1qGPT3R4M8fvId3Wsxwxet3rrC9t2cFLAX1SmZmJYzSl0y10UC3jdVQvztFl4C6YH6CpqylVGXvQqPW5nRKhX4Ee0/GftL3sO5FPcar9Y0uoiiMUIhD8X8Y0gVFUQQf+jj1giAgrKi1kaUGiEatpSqpLT/ZPwRv2xzEYoQE2Sz9Wm4ncbTw3ZAF/nfRQMx9GEXxbp1urvqd1Ltrc/BY9p6zQwpTzVHfN54tJ7towfsJh+XAk1uN9zCmi2PyPt1wvZ4wxtWDIyxIT9rl1h4GfzXoXA+nSbyi9G5eFUQpb8n75z4NPH2Nnp4VbaLfEjyJF4g2RjbdzxOjRQzb6Ku7pPpFhgEYCdWxez9verZF/lMYkmCWFr1Lf6ihp0Sb9IY7n7YhiEToMG8r0cQfmIZ0RU2rDW10W/L+ciGljZxf8GJ0LFZu5RkVwnnLtMxfOFkvl8t9er2oRbJzEbFhXM9L083mNJ1unaiT+mkK4RVO9rPAa70eOgytTtMmsqH/Sl6nSVTbe3yRoPytNIs5VzprocjrK18/X+1QT0TcH65ZZxDC0e46qJGqIaCk4zwRPQqaNMDObO7X9J4cjlGy3r5dyRCEXF1rofTLwIwXB50vZDb8WPMHiKsHL6LH6UuH1UH9gm3Re9vVPmE+t29nA6WSvMDkap2ptQy9wPgXV3u+zhPiZdl++h5HVT+EqJ98aSX+DzA8JLUv33GfEutJAePPaDuNBoFnAgCPsGHO+MejXfWrEIbxfkyqoX7G8C1alX4SwWCKMlYOEfHpoXY4uHsaB0ChE8fUHBz11fJqS6MlYb/N8OVY+qEQ+8kSpNizktkqfDBtGHZ7xoOKtCEmoIz5OU9KJBHvR4/9IkP2Uko54HPBXAS8+tZZAwzBB4NaO8h6MJ+ixDLU7gHkj4NsmaDC3INokl5+j+EeFeDDRZKqSeUD5DAMR/Ba4WVr18PejNMlAYYmqIxf4eDDxM9rviGej+5kWLFaiEtsHOc7MFwdP2eBxjrouR59Ms3wXY+uMC5B1TLsJKCCHqEP4WUOh7Jbu6RzPR3z6zCOZm0Y3speuOxzMduILs6HsXNToq/P9aVv6A48KkIV0F+dKybon87Fldd+/12TiTJ712U/R25HotW2DFX8vZt7T9PcAoj9rR4aWj8isJWEBhKKwDRD1yUoCc6HCmElVQt2svgvyEvdzMxWrlQsmE18942h8Yzd0trMC1KpefdyOTHYX5thADpupocpHQrXg/GuoWhQGj4vp21yjI7J+tMLWEFdzuDtpTJcGna3rVIEKhDxtr4jUxjtyY9sCzfhg/PzyuEFgZ4HUSwYZrCI0bc8FF9PE6V0Im7d+vHQYzkoMjS/JDgx404tS9XpbZ0XB/lD8gOGTjw9opO06mmRDxDtyjwCm70oyUORUV4f4pN9IVLBbIRj4dhK4alOK6TqdK6J1T4Q/goeZejtLEF8FOkCVeNhBk7FM9cozc9ec1BsWbJGkA3iUAxTWBMx14RAVw0PJanUK304OlGcwwcZ2t4RSR2ZWovLWIGe6RENGMwXeJ6DYusqPwfe5qACM2fx/tf3h3GtXT7Y2dgA/1qSqg1D81DF4rqHQMKKpwXqFV16Zi9i5EIF1Sl8iJ5zUDP4YHWFADH8Ue956J3MLB/6Zana9KGJtMMxbPNWMoQtXZRAL9BhDuqjxlOB6NaFYmvQFRJwsvlZk2/l2xhYEPNwlxfDrlB8qJhd8cqVZ15ggJALxWb17pxw5EKNwfuBzKTDmnwr/dQA4U1BKse0L4usPzSmN7eMmiM50wIFOmQuVFzPkCtpLtSw8KjC642o14F5Jv64KFXpgRQ1b2PRRCm7YYkFSY4DinNQhyaXFc5nIxxzH4op54bVagIe6bAmKL7WthhF5qvklq3JPnMzCX3LQSX1XShI5KCGeaDTbbt8urJA9zE09mfCag0Cg9V1ByJXblyoQVMqNO9Erlc6UHmgNgUozAOcsfsYQqAW3rdgCNFn8ORdqEMzQ/HOWii2dIG2JakqGIILhH7eyVDrhegYeLcZemP7romQQxeqPl9f3Z6PNhk7GwW4LFUFw47Ri4P7GEKwzLmVV4vsDEX8lodqfA2lYDWvNF63Y3iGfeLHGKqAp5sMmQkBKr48vbiRoO8fa1/pazuGNuTmthfDWXkgMS388nL2ZF2MXABEpD7tQF3uY9glH452WpRKM8xbuSZsKqhZD6udFxcwGDbt6jNcYXFRwZj2rpsM4wJUAh9o90XpB4tVI2AnenG5q2pEoJUFbSTcrM9wNvOJmBwdKBI3Lfiqq1yoN/Me0jlps+dHtKGlspHbV40gifu92zt11vxDMckxLCqthSZ0ZhfKWRDDoBVD0PujslRNDBmoiPitDcOp6+wYuuoyG95YD9Mc1JvzPITv9CZDBsnQyry4gyGMbq6h3GaYS6ZAsedCZc19SAc5qJyWfsxa9KHZQtjcx5B/E0Q43WaY5ljQz5y7vcG00HHwFiqvAKH8K13F0JbmUHUd7mBofV/o+ybDAgkbbMih2L6pE+XzM1Cv+dCHkGsDzQytH0L7C+6y8W1Zj5cbDK+FXgpPOagGrSZMXCj2WTSlZ6yRoceMlb/q3c3QRM3xWWpzqWBo52UTRGq8ZS4US+s7UbnkAGpsFCPj8G5k2M9MrhF9L0llJa3b5CeJFXwIdR2qohj6EGN5hLWPbnNQQ7eKidvo0IWy/vIYun3RWMvCFjNA0aguIKKpaoQdfAibcVehtYFgeDsyVGbMhXqvXjHoJHChRub6F9SFoYd6rS0Y2h0V+kmqdMlmL0bHml4CIh7VjhWYZ1YjUyoD6+1qgNpW9SJdj3NQE6ORemPsmEQFqdR7xTxHlcDz+rTw5h1Sq4vxcTCtYbgxd/C/jX9ObVcbqC0qKm8h+iA5KOPPQSkjU/2PhfFj5hiKGkuOuzrxSlK13QPO2e7JqJIhVB4IxUZEYvohz7CT5vctwlWyKWSrwyapqCTCoFpEuCZlqTwym+Qq3/RYSaq2DMnamekxmgwqGBq9MOu4Diy5XW2hmLdPFjRUe0/UTw5OMp+EMoqfyDLqdoxeXK4qSLLlwlXukh/t4wefuWpO0TYjhVIPMLvgndx5g4GttqtdKEbSz3l0PB6j85tYJPJimWAFPBeXOmauyYpSXZZHd+LiPfizSAUyW+QKk6F5GuQ8kzA/0L3aEIRFURo/+emBMRIENQEU4J5FeCwZgq8XwzDVUNfPMO9xPJeg7mTosU3srtgI+0nqWTeuGZaRnpdPIABO76jueYVvUTn/cKizHqaxI1Vv9J7b4/aRUp9+WjVivM6HeWAarzOIxYBFkz9rvfLAas0n/dYFmWwsRuLpRQymVv6g5BXS6U0TnFePaHQtQwFDsx4C1YaqEZ1Rkt//QxTFe/lGBuBkQ1coz5CZ7njrtCz1QMyGBb7Kq2IG0IMDnztCLxkdJsXIKBSuPVaEAvR7q0b0P6PipgmNdsNxMLa7+CZJYgeTTVQ19VYp8TZMASIvuF00h7Qq/s/v9ygsarer44GUoUovQ9soaDaeR0XVK8T0uATRToahE1YxaRky7jwTw9Ao7Ggah6VwU0T9TdW79pM4b5Kt/ZJTyWqGI8vQWqV4Vl6KKxga14UK4NAMjQ1ekeagwnp+PZKdeB+oLvw5Ed9moB2Cpsq1gBYMocKGthZVtwZcQ6j5Ld5/217Nw/pprD7JhseSgql+1V/stl9pRgiff15foBNDKHTcxBDmUTHNSMbXzSmJ6pI4UBhPe7XD4efZCKRzOK8qOxLx1xJFu8lynwUXkyFK96wOCsQ6mM3m9eWymb5PYkxxXQIOf/X3l1qo38q36J2S2lQLUa6c0sXEJB7GHpGF8h3XQ14sZ2PjKBIy6pOLEEZiIa4s9trE0KyM91SNuJ5i1JDn5AT7hbv5cDic7U1iJWRaZtnoejqd5jd23xx60Zq/BewvVY3o9y/X6aRVulOIeVPpMSFdhOK5COuCYpU4U1/JO0ePxh+Hy2OFIxyqtf6C2r2nG3uDv9ai9cx7QtWIji2N8POsw8pm4JPxPSX6NcPSO/oAw56Jg5gcaVg7/z1Ejo/jaALv6Gr8pJMDDsZKDbJ0OE8WSORZ/pCnCD8N/Tg5bUadHvzA7El9+A6zRCatW8INgO02OfIFAz+Qc4nkhISjyXq5NysJ7GKS5zCEXG7t6lLvdI+vCPvlPI6Pi+budLer0OIYxwlfV/giIhZQmB4gl3vyHIZg3oOjwUkMVGnre7vRgiKxPphMS7FQ2HR8dDxcB0JT6RtFXQNtoY7RL51vcSdDY95/lBhqNdbuWCzScaCa0bkGRu8JIQC2VDXC+FBnP2DYaHzDpcqqETDRmCJDnSKUU3jfpKUB1MiGr57gi7VVI/BTqkbA2RbIhwdXhhpYuyHJQwVm34dOKjxE+gIETHAD+wlVIyAOylp13TIUMbONjgeGqvMmhhxFDfXaIGBCOGvaSVWGepxhYKbyJoY2KFbFPGhjeminmWsTQwgliZ/CEHy25mSHCobdwL6KKrxdBlDMTNeuTk0199gXhHQ9gyHkVtBNE0PPsxutcn+fQ7HMLCNy7/Y2Q9+/PKGmAgSyIJPsUM3Qs8WEZFRfl2UmTiqUpRMbGKbgjj08gSGEFdjIi2qGbt5GIqFsr9aGiAAUJOTg0xMYmrqJ5q6aPiSp2b9afXDVySZT6cS0BoaZ9nGEf6j2ZcdilVYe2FpEu5tQxJ4Ktdpe7K4rpG011b7Uuq9b+7JJqt+oGgHtcjY5zqXvlaBMPIqPzmbMcouhttSDgdLfxOvi6R5/qmqEM1Z0Tk1YVZO9BGXre9g/kjZV57WFhpIn2BZg2cxbVZ0/Fl1qYdyw+V6qq/8Mhn2oBb1sxTD1i21k0JsYTv9nGLIsZ/aH/qDTIFaZYfTPM+SWlNuB6LtRrP9Jht54ap2/Yp345xnCTNOWIUudgjPouGnJcPub72HFatFtwDo3zKVlKJLl9ldx2/ewimGTVBUM7zzz0tZn0Ica4QlcaTo+szMs+Re/G37PQF2gwsmudQGKu6tG6E6p0Nr0b0/MpXqo3DFkeqAic5xeg9Zmqk/+oGK5GdX3at46hvi25u15wbLKc2pODGyhef+k6vzDDIf6vbplPfHmhDiGNsIK4W1tcLaxnrTLMZw+wcaHwpT4hgXMiFN7YjW5uMfpvd9gaEJO8Nsz/DSQwOeEiFRAkZkTbLQadl7ccEd6vGHjw0Dx2wYf/SZD8PSFxkCsYsiGbonBrYAKnEOEcfTdxNBJv3oCQ0iNQr4NZCpBZTu7SiB5djGHCvZhjnXDewhv7/szGHrgJTIJJGWG7lGkWAUSCiiyjxzeSUpKYiko4wta7X/A8FEvxmuXQYmouA5q6gSl4PhqoUjqxDFjf0lyyQsGyuRMoesPvPpNH94ICoW4IKoPJstBseAT2VkThZOx50JdEkeJW4mw7045vAByr+4KVe1UQsknAh3cXsc1DOTuk6t5M5a6R6Yj+lGCenesfoTfR52SXgp5DlK7f8oesNnmRpFHcgyD/dwN56WRTT2wDz6nqmL6fi0wHNiDPp4VqWDP0MTR0COG4eAUu0X6UMg7qAKKuFkhItkhTk0mQEdUnzGnDohyCc9haAug8BlxqbB600m+NF642tZAMW+ev5Med0tP7hR3ron5SMVwPomhjZwUR7+j45HSQoFhTr1fD8W7sVCREVMaHaOFG/8Yyrf8WQw3bh9U1Kel0VsjFO/G0pdQHocqE/tZDDvfTaGFIZoPbkEFadJYNZsmD0jVomqExiqtPGU79FQbNROiJGsBxdXruD7AiCZZURu4N3KvwXnR5JYwly6pX9mNdLXbXFpCvX7W1c+m8WNS3a4aUejz5qoR8yJHFNLo3LsDioyHVSG5oT9sqjN7s5aF7vN7GNbouNe5OMsAGsaLyaE25bQGinhp4ufCGxHmo7w5l/tP2xYuVu9NFO4U7Thf7h+CYmS8PB8XqvQ+pv5xngY/lOo3Gcomo7e7jPzgwfcGg/S0nU+HMw7EfkWq32RY64m6H8okp/xnGf4i1P8zrMcqz8sPi/VHoeqrRriXWkUx9P5NKEu1ldbWzl/wb0I9qHlXbon9S1A/ti3+n+HToW5VjRAeJi/LXiDzbMANOo9UV5n8X2SY7OJdkiSx0xJ+ZTIMCPtvMIxw0aUgPRWY0mT/H2FYZ3pzE+n9uQwJb40VBCoYVnj1axn6Yh+iD1illef+DYJ7obI1b+d+KyigWpGMofZAUb45FNVdRntoU4CiZeLKTagLCsNwBQegPlw1QjJE8cS2RHhEwaWCd/kKvD9Wl++AkvVVTe2ah6tGSIZyE/tCdAv431twxqtn+BTbQh6j28CwpW2hGJbrJvbOEGjS/Y8yNPF0osjOcxjeGqU/ZthToUqyUvTzGK7+IENd/0pW+/5v9iEU9EQzVhKLEXLbjcvkpHWTIQleRqKVoNR72A3k9Pd4pILLUDeDpcJhwz3LL+HMy2bzCddkk/floFcTBEi8bDifxFzjPZ+Ho0GHVGoDHulmH7Fywsbvmz4DpUEYAJIhTpLJhCvO6cNVIy6S4bCqWENfBdPg/If9SzrxKZaHHmG6iqf9iu/2L8tE3yPTt9FkWFUPot//PKqaEmJRxqto/npRvyxqT6gwJCTP+V4dGstJOFSrtTYsjuMo7fLoAsUip9DRj0ZJrnoNwpGpmWm0tsuhUFbLD/FRH0vjam3XqFB9C6NPedO5WEmDbh73YmiGFeoy+wwtQ3htT8VyWXy6WwND3di84hxMHUzkat5vFZV+VJ2sbVFZFgxLr/sdtkU1Q10cXoSIGqyJPmWKjz0cQs2BlQ4/BXAdmRhSvFgs+G36K6tRTqxAByDDffo2KpL5tlScP68/Fm31RxgGWgXvGyymi1iEKJ6mX1+f56O6hU56lqGOZ8Ro93a9zmbp14eO/laRxiAWhMyFaDdMZ/w+2EMVGbmnRDT5eST/TP4EQ10pWsZ7KSymNDm0mmw4FBMlEvdryXG1tAxl5V6Ez3r653d5+pxPGaUKD2um55H3kZKKseBNKMOqFq5YIsZStHPhuf8eQ5aq0F26BCxd4TyMDhaKkf1CiLq42lGaHVEYbXIPSwXJygO8gKGM8ECyBrlJ7c8m3Kb5hodlF7I/wpBAmuvChmpJDQBr4Y1YspY33lmGZL+KB4UBL1NTwomBUnUKdKS7I9WRqin3cYZdg5VnWDgriHlDnYi2GgIWk4c4o8W1AEU2QrsT0wj8njd0oFSPyXAOZ8CrxGEtviMVSH8vwybjWzH0sq71JmbZHiInUGKMb3UI4uqtU4KSEO+OOtU3vwhX5NkYIgpY2/Ez2YVxo0sAGBag7q0aoWe+yG0+BhMfRZlREAZSEY/LUGwvxjO/0xkqRQVQ1jNDUQC6hqyiGC5JjVRdO7zmpAB1b9UIzbDaTYN8fV6gGMEy0hRDBpQLlYkOCr8KRda0u0A38SLKgsHqZVBK/axOKjUSNcPiu/aIbVHTVhFUfRRYMgyTVkHJA2j4bOUwZAH5+Jjsdu9TnVIilxDDcKPWoeCJDEX9wPgwdrB6cjqk4wooWbkTxcQy9IYLSoXeLcrx8NVah/8ZhrImDWQX/xWGojIVFtoR0I2Sz00vhzVayDeJQTU9Z2J6nasOMgyvuRAvrrVcZbSw7cOTXGE+/h5DNNnyJhyw84VSw04lrKueeqqaj3IMv2EilnWvQvEAR1IdsgzFO63Omfo7DKU3sS+mBjbTo3ZTYqhUHFTVFHdg+K26jkbxephdh5NI3KFGQK4Pw7/J0HoxiDrGIX/shsDa3KjuaBlKxgivs4DI8t+DaeQcueWM0l9keGs9dL0YgSr4K8sFuf4C+R76x7i2Jbrq4VnpY/vAWcT0CYZiPZRiyROfOMM6qdqthw5Dq9OUIxuUF4PYyAb9wqEsHyQhT4FFkx7ML6+v2Us24P9lcEUFScjF0aff8D3ZVBoUivQlpZXiZb1U8ktStKkV4cGqEWXNW53WITI8XA1QSm7PV60rjKbq6egD1eywG8dyMupoZVLaLWbzrqaWxR+0LVQ5HfpBXCyVy0qboOR7LB0DkM1nxCIT7DJUHb1ohvqDDPXZRmGWZ+iKXs9QHmGCNkWG+T5Ud8Fx1X+fYaAyXsM4h5W5w6+eobJsDyWGuT5k8uAHHD+LYVdXscJLFyuQtOnhBkNZSL7MMMn1odeVy67Og34CQzZTWxZw9LY6pVP2LJ8PmxlK5SUsvoeBsp6MWGQpu3oxKkANJoO/wtALVJU4k3XoTA8wA7pQy6kRi32hirmUzRZ5hvrAP1Vk30INkpWsDGYZ3u2JarNaCCw1iswTVNODSl/WpQMNFOnMqVpEZKkHdXr6apMTKzjjAkOd34yEWwugiKgQps5kElCK4c6Rqp5hQ6qC3rfIZS+I+gy6ijq6ut9ThzVwGS5OasTnAou+MHfN5fuK3y5OqYe1GvWR870X9bwQfd+oa5dsLTV2vNB36ZKG3xdRd/vwcNWI2r0nlRwpTqu0+lFPJXmhxSTVUIM3ZSjhuSkzPlAuEDTPmNJLO/weX43JwFW1dF2p0I+3b69v21jtFyD0CVBqWl6sZ9nSjx+uGlG7f9jT7mzptjBYSiqEaZRwe2ue6IMUcJzZ4TMFyefL4dvbdC5yZWic07yVVBNIkJWFa8Hi2hOA0sfZ4FAY0zPLEORszZBb4lU7pHrdX8xyWOY4KxSKBBMtYZK5gX5bsA+5gRhSflOIThlnUGDYZR+lrRkcpfaUopHjf3BOjbiTIYnF6UzDCoaaDN3lH7yb26z5RZ9e/lj3aX7vaRVfO9mKYhoXQgLI127lJqLS1Vl5hjTUdWUo0uOjDMsldew+/jGKOPvFZ26Xm42XCcLiYC7Vjzhej4unP/S781BV/Ra7qNFeiCWyRnMDXmy1sCCbRGIrVdTl95Oplz+mrXON5RFgfLTsbIrcL8bqD6RDZpYVxCJe+pFE0WIRRfFkfx2QMpQXpHt+iy8SiDaNlSEZyQ5fw/N2mm6uFVINTkkcRclH6rE/wbBBLFJ3LhdAybO7gjaRCl7zGcr6su4AAAAWSURBVJbkwvtexPP+VYb/HNR/n+H/ATmdw2eu2qfBAAAAAElFTkSuQmCC" 
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












