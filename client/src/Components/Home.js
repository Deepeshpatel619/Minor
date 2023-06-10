import React from 'react'

import img1 from './Images/photo-109.jpg'
import img2 from './Images/photo-104.jpg'
import img3 from './Images/photo-103.jpg'
import img4 from './Images/photo-100.jpg'

export default function Home() {
      
    const sub1 = "https://source.unsplash.com/random/1200×450/?webdevelopment"
    const sub2 = "https://source.unsplash.com/random/1200×450/?programming"
    const sub3 = "https://source.unsplash.com/random/1200×450/?science"
    const sub4 = "https://source.unsplash.com/random/1200×450/?physics"
    const sub5 = "https://source.unsplash.com/random/1200×450/?webdevelopment"

        
    return (
        <>
            <div id="carouselExampleDark" className="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" >
                        <img src={img1} className="d-block w-100 custom-100" alt="..." width="1200" height="450" />
                        <div className="carousel-caption "  >
                            <h2>Welcome to the Quizzy</h2>
                            <p>Each One Teach One</p>
                        </div>
                    </div>
                    <div className="carousel-item" >
                        <img src={img2} className="d-block w-100 custom-100 " alt="..." width="1200" height="450" />
                        <div className="carousel-caption">
                            <h3>“Education is the key to success in life”</h3>
                            {/* <p>And teachers make a lasting impact in the lives of their students.</p> */}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={img3} className="d-block w-100 custom-100 opacity-80" alt="..." width="1200" height="450" />
                        <div className="carousel-caption ">
                            <h3>“Stay positive and happy”</h3>
                            <p>Work hard and don’t give up hope.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={img4} className="d-block w-100 custom-100 opacity-80" alt="..." width="1200" height="450" />
                        <div className="carousel-caption ">
                            <h3>“Education is the most powerful weapon which you can use to change the world.”</h3>
                            {/* <p>-Nelson Mandela</p> */}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* card section */} 
            <div className="container mt-4 mb-4">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">
                            <img src={sub1} className="card-img-top" alt="..." width="300" height="250"/>
                            <div className="card-body">
                                <h5 className="card-title">Web Development</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <img src={sub2} className="card-img-top" alt="..." width="300" height="250"/>
                            <div className="card-body">
                                <h5 className="card-title">C++ Programming</h5>
                                <p className="card-text">C++ is a statically typed, compiled, general-purpose, case-sensitive, free-form programming language that supports procedural, object-oriented, and generic programming.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <img src={sub3} className="card-img-top" alt="..." width="300" height="250"/>
                            <div className="card-body">
                                <h5 className="card-title">Operating System</h5>
                                <p className="card-text">An operating system is a program that acts as an interface between the user and the computer hardware and controls the execution of all kinds of programs.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <img src={sub4} className="card-img-top" alt="..." width="300" height="250" />
                            <div className="card-body">
                                <h5 className="card-title">MERN Stack</h5>
                                <p className="card-text">MERN Stack: MERN Stack is a Javascript Stack that is used for easier and faster deployment of full-stack web applications. MERN Stack comprises of 4 technologies namely: MongoDB, Express, React and Node.js. It is designed to make the development process smoother and easier.</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col">
                        <div className="card h-100">
                            <img src={sub5} className="card-img-top" alt="..." width="300" height="250" />
                            <div className="card-body">
                                <h5 className="card-title">Operating System</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
