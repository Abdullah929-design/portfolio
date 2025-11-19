

const About = () => {
    return (
        <section className=" col-xxl-8 px-4 py-5" id="about">

            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">

                <div className="col-10 col-sm-8 col-lg-6">

                    <img
                        src="/cover.jfif"
                        className="w-full img-fluid"
                        alt="About Abdullah Salleh"
                      
                        loading="lazy"
                    />
                </div>
                <div className="col-lg-6">

                    <h1 className="display-5 fw-bold about-heading">
                        About Me
                    </h1>
                    <p className="lead">
                      I am Abdullah Salleh, originally from Lahore, Pakistan, and currently pursuing a Bachelors of Software Engineering (BSE) at Comsats University. With a strong focus on web development, I specialize in building robust web applications using the MERN stack. With that i am also passionate about machine learning and its applications. I am eager to contribute my skills and knowledge to innovative projects in the tech industry.           
                    </p>
                    
                </div>
            </div>
        </section>

    )
}

export default About