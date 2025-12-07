import React, { memo } from "react"

const Hero = memo(() => {
    return (
        <section className="container-fluid px-4 py-5 my-5 asymmetric-hero">
            <div className="row align-items-center flex-lg-row-reverse g-5 py-5">
                <div className="col-lg-6 d-flex justify-content-center align-items-center position-relative">
                    <img
                        className="d-block mx-auto mb-4 shadow border hero-img-floating"
                        src="/profile.jfif"
                        alt="Abdullah Salleh"
                        width={300}
                        style={{ borderRadius: "50%", zIndex: 2 }}
                    />
                </div>
                <div className="col-lg-6 hero-intro-box glass p-5 rounded-4 position-relative">
                    <h1 className="display-4 fw-bold hero-gradient-text mb-3 text-wrap">
                        Hello, I am Abdullah Salleh
                    </h1>
                    <p className="lead mb-4">
                        I am a full stack developer and machine learning enthusiast. I love building web applications and exploring new technologies.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
                        <a href="https://abdullah929-design.github.io/Resume/" type="button" className="btn btn-outline-secondary btn-lg px-4">
                            MY RESUME
                        </a>
                        <a href="#contact" type="button" className="btn btn-outline-secondary btn-lg px-4">
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
});

Hero.displayName = 'Hero';
export default Hero;