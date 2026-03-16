

const Hero = () => {
    return (
        <section className="px-4 py-5 my-5 text-center">

            <img
                className="d-block mx-auto mb-4 shadow border"
                src="/profile.jfif"
                alt="Abdullah Salleh"
                width={200}
                style={{ "borderRadius": "50%" }}

            />
            <h1 className="display-5 fw-bold text-body-emphasis">Hello, I am Abdullah Salleh</h1>
            <div className="col-lg-6 mx-auto">

                <p className="lead mb-4">
                    I am a full stack developer and machine learning enthusiast. I love building web applications and exploring new technologies.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">

                     <a href="https://abdullah929-design.github.io/Resume/" type="button" className="btn btn-outline-secondary btn-lg px-4">
                        MY RESUME
                    </a>
                    <a href="#contact" type="button" className="btn btn-outline-secondary btn-lg px-4">
                        Contact Me
                    </a>
                </div>
            </div>
        </section>

    )
}

export default Hero