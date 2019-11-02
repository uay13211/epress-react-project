//jshint esversion:6
import React from 'react';
import Footer from "./footer";
import {SkillSection} from "./skillSection"
import {ContactMe} from "./contactMe"
import {Social} from "./social";

export function Home() {

  function scrollDown(){
    window.scrollTo({ top: 690, behavior: 'smooth' });
  }

    return(
      <div>

        <div id="slide-section">
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleFade" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleFade" data-slide-to="1"></li>
              <li data-target="#carouselExampleFade" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active" id="first-slide" data-interval="3000">
                  <div className="carousel-caption d-none d-md-block">
                  </div>
              </div>
              <div className="carousel-item" id="second-slide" data-interval="3000">
                  <div className="carousel-caption d-none d-md-block">
                  </div>
              </div>
              <div className="carousel-item" id="third-slide" data-interval="3000">
                  <div className="carousel-caption d-none d-md-block">
                  </div>
              </div>

            </div>
            <div>
              <div className="text-center mx-auto fixed-text">
                <h1 className="display-4 text-warning">Welcome to My Website</h1>
                <p className="lead font-italic font-weight-light py-3 text-warning">My first MERN demo</p>
                <hr className="w-25"/>
                <button className="btn btn-lg btn-outline-warning" id="get-started-btn" onClick={scrollDown}><i className="fas fa-angle-down pre-arrow"></i><i className="fas fa-angle-down next-arrow"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div id="intro-section">
          <div className="py-5 container">
          <h2 className="py-3 text-center font-weight-bold">About me</h2>
          <hr className="w-25"/>
          <div className='container first-intro animated'>
            <div className='container py-5 first-intro animated'>
              <img className="w-25 float-left mr-4" src="https://image.flaticon.com/icons/svg/1373/1373204.svg" alt="first-intro"/>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='container py-5 second-intro animated'>
              <img className="w-25 float-right ml-4" src="https://image.flaticon.com/icons/svg/167/167707.svg" alt="second-intro"/>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          </div>
        </div>

        <SkillSection />
        <ContactMe />
        <Social />

        <Footer />
      </div>
  )
}
