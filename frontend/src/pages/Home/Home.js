import { BiUser, BiFile } from "react-icons/bi";
import { FaRegCalendarCheck, FaRegCalendarAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdKeyboardDoubleArrowRight, MdLocalHospital } from "react-icons/md";
import bannerImage from "../../assets/img/banner/banne-slider-1.png";
import footerBg2 from "../../assets/img/footer/footer-bg-2.png";
import aboutMedia from "../../assets/img/home-2/about-media.png";
import expertTeam1 from "../../assets/img/home-2/expert-team-1.png";
import expertTeam2 from "../../assets/img/home-2/expert-team-2.png";
import expertTeam3 from "../../assets/img/home-2/expert-team-3.png";
import badgeLineYellow from "../../assets/img/team-details/badge-line-yellow.svg";
import testimonial1 from "../../assets/img/testimonial/testimonial-1.png";
import testimonial2 from "../../assets/img/testimonial/testimonial-2.png";
import testimonial3 from "../../assets/img/testimonial/testimonial-3.png";
import logo from "../../assets/logo/1.png";

import { Link } from "react-router-dom";
import "./Footer.css";
import "./Home.css";

export default function Home() {

  const userRole = sessionStorage.getItem("userRole");

  return (
    <div>
      <section className="banner-slider__wrapper pt-0 pb-0 overflow-hidden">
        <div className=" overflow-hidden">
          <div
            className="slider-item"
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "800px",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="banner__content text-center position-relative">
                    {/* Black transparent background */}
                    <div
                      className="black-transparent-bg"
                      style={{
                        position: "relative",
                        top: "80%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0, 0, 0, 0.5)",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "80%",
                        maxWidth: "80%",
                        minWidth: "1000px",
                        zIndex: "1", // Ensure it's above other elements
                      }}
                    >
                      <h6 className="sub-title color-white mb-15 mb-sm-15 mb-xs-10">
                        Welcome to <span>LABCARE</span> Lab Appointment System
                      </h6>
                      <h1 className="title color-white mb-sm-30 mb-xs-20 mb-40">
                        Schedule Your Medical Tests Hassle-free
                      </h1>
                    </div>

                    {userRole === "PATIENT" && (
                      <div className="theme-btn__wrapper d-flex justify-content-center">
                        <Link
                          to="/doctors"
                          className="theme-btn btn-sm"
                          data-animation="fadeInUp"
                          data-delay="1.3s"
                          style={{ zIndex: "1" }}
                        >
                          Book an Appointment &nbsp;
                          <MdKeyboardDoubleArrowRight />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      {/* About Us section */}
      <section className="about-us pb-xs-80 pt-xs-80 pt-sm-100 pb-sm-100 pt-md-100 pb-md-100 pt-120 pb-120 overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="about-us__content mb-lg-60 mb-md-50 mb-sm-40 mb-xs-30">
                <span className="sub-title fw-500 color-yellow text-uppercase mb-sm-10 mb-xs-5 mb-15 d-block">
                  <img
                    src={badgeLineYellow}
                    className="img-fluid mr-10"
                    alt=""
                  />
                  About Us
                </span>
                <br />
                <h2 className="title color-secondary mb-20 mb-sm-15 mb-xs-10">
                  Welcome to LABCARE: Your Partner in Health Management
                </h2>
                <br />

                <div className="description font-la mb-50 mb-sm-40 mb-xs-30">
                  <p>
                    LABCARE is dedicated to providing exceptional healthcare
                    services through our advanced web-based Lab Appointment
                    System. Our mission is to streamline the process of medical
                    testing and ensure a seamless experience for our patients.
                    With a team of highly skilled professionals and cutting-edge
                    technology, we aim to elevate the standards of health
                    management.
                  </p>
                  <p>
                    Our platform offers a range of services including scheduling
                    appointments, managing test records, and providing easy
                    access to lab reports. We prioritize patient satisfaction
                    and strive to meet the diverse needs of our clients with
                    personalized care and attention.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="about-us__media d-flex align-content-center justify-content-center align-items-center">
                <div className="media">
                  <img src={aboutMedia} style={{maxWidth: "70%"}} className="img-fluid" alt="" />
                </div>

                <div
                  className="expert-team expert-team-one text-center"
                  style={{
                    backgroundImage: `url(${expertTeam1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <div className="number color-white mb-10 mb-xs-5 fw-600">
                    <span>15</span>+
                  </div>
                  <h6 className="title font-la color-white">
                    Years of Experience in Health Management{" "}
                  </h6>
                </div>

                <div
                  className="expert-team expert-team-two text-center"
                  style={{
                    backgroundImage: `url(${expertTeam2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <div className="number color-white mb-10 mb-xs-5 fw-600">
                    <span>100</span>k
                  </div>
                  <h6 className="title font-la color-white">
                    Satisfied Patients Served
                  </h6>
                </div>

                <div
                  className="expert-team expert-team-three text-center"
                  style={{
                    backgroundImage: `url(${expertTeam3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "300px",
                    zIndex: "0",
                  }}
                >
                  <div className="number color-white mb-10 mb-xs-5 fw-600">
                    <span>100</span>+
                  </div>
                  <h6 className="title font-la color-white">
                    Tests Handled Daily
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /> <br /> <br /> <br />
      {/* Counter section */}
      <div className="counter-area pb-xs-80 pb-sm-100 pb-md-100 pb-120 overflow-hidden">
        <div className="container">
          <div className="row mb-minus-30" style={{ placeContent: "center" }}>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="counter-area__item counter-area__item-two d-flex align-items-center">
                <div className="icon color-yellow">
                  <MdLocalHospital
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    size={30}
                  />
                </div>

                <div className="text text-center">
                  <div className="number fw-600 color-yellow">
                    <span className="counter">10000</span>+
                  </div>
                  <div className="description font-la">Tests Conducted</div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="counter-area__item counter-area__item-two d-flex align-items-center">
                <div className="icon color-yellow">
                  <BiUser
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    size={30}
                  />
                </div>

                <div className="text text-center">
                  <div className="number fw-600 color-yellow">
                    <span className="counter">50000</span>+
                  </div>
                  <div className="description font-la">Satisfied Patients</div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="counter-area__item counter-area__item-two d-flex align-items-center">
                <div className="icon color-yellow">
                  <FaRegCalendarCheck
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    size={30}
                  />
                </div>

                <div className="text text-center">
                  <div className="number fw-600 color-yellow">
                    <span className="counter">24</span>+
                  </div>
                  <div className="description font-la">Hours Availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /> <br /> <br /> <br />
      {/* Service work section */}
      <section className="work-process pb-xs-80 pt-xs-80 pt-sm-100 pb-sm-100 pt-md-100 pb-md-100 pt-120 pb-100 overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pricing__content mb-60 mb-sm-40 mb-xs-30 text-center">
                <span className="sub-title d-block fw-500 color-yellow text-uppercase mb-sm-10 mb-xs-5 mb-md-15 mb-lg-20 mb-25">
                  <img
                    src={badgeLineYellow}
                    className="img-fluid mr-10"
                    alt=""
                  />
                  Our Work Process
                </span>
                <br />
                <h2 className="title color-d_black">
                  How Lab Appointment Works
                </h2>
                <br />
              </div>
            </div>
          </div>

          <div className="row mb-minus-30">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="work-process__item mb-70 text-center">
                <div className="icon mx-auto">
                  <FaRegCalendarAlt
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    size={30}
                  />
                </div>

                <div className="text">
                  <h6 className="title color-secondary mb-15 mb-sm-10 mb-xs-5">
                    Schedule Your Appointment
                  </h6>

                  <div className="description font-la">
                    <p>
                      Choose a suitable date and time for your medical test. Our
                      online scheduling system ensures convenience and
                      flexibility.
                    </p>
                  </div>
                </div>

                <button className="theme-btn btn-black text-uppercase">
                  Step - 1
                </button>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="work-process__item mb-70 text-center">
                <div className="icon mx-auto">
                  <GiReceiveMoney
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    size={30}
                  />
                </div>

                <div className="text">
                  <h6 className="title color-secondary mb-15 mb-sm-10 mb-xs-5">
                    Payment and Confirmation
                  </h6>

                  <div className="description font-la">
                    <p>
                      Complete your payment securely through our platform. Once
                      confirmed, you'll receive an appointment confirmation.
                    </p>
                  </div>
                </div>

                <button className="theme-btn btn-black text-uppercase">
                  Step - 2
                </button>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="work-process__item mb-70 text-center">
                <div className="icon mx-auto">
                  <MdLocalHospital
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    size={30}
                  />
                </div>

                <div className="text">
                  <h6 className="title color-secondary mb-15 mb-sm-10 mb-xs-5">
                    Visit Our Lab
                  </h6>

                  <div className="description font-la">
                    <p>
                      Arrive at our lab at the scheduled time for your medical
                      test. Our friendly staff will guide you through the
                      process.
                    </p>
                  </div>
                </div>

                <button className="theme-btn btn-black text-uppercase">
                  Step - 3
                </button>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="work-process__item mb-70 text-center">
                <div className="icon mx-auto">
                  <BiFile
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    size={30}
                  />
                </div>

                <div className="text">
                  <h6 className="title color-secondary mb-15 mb-sm-10 mb-xs-5">
                    Receive Your Report
                  </h6>

                  <div className="description font-la">
                    <p>
                      After the test, receive your lab report promptly through
                      our online platform or via email for your convenience.
                    </p>
                  </div>
                </div>

                <button className="theme-btn btn-black text-uppercase">
                  Step - 4
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /> <br /> <br /> <br />
      {/* Testimonial section */}
      <section className="testimonial bg-dark_yellow pb-xs-80 pt-xs-80 pt-sm-100 pb-sm-100 pt-md-100 pb-md-100 pt-120 pb-120 overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-9">
              <div className="employee-friendly__content">
                <span className="sub-title fw-500 color-yellow text-uppercase mb-sm-10 mb-xs-5 mb-15 d-block">
                  <img
                    src={badgeLineYellow}
                    className="img-fluid mr-10"
                    alt=""
                  />
                  Testimonials
                </span>
                <br />
                <h2 className="title color-secondary">
                  See What Our Patients Say
                </h2>
                <br />
              </div>
            </div>

            <div className="col-sm-3">
              <div className="slider-controls mt-xs-15">
                <div className="testimonial-slider-arrows d-flex align-content-center justify-content-sm-end"></div>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div
                className="card h-100"
                style={{ border: "solid .5px #198754 !important" }}
              >
                <img
                  src={testimonial1}
                  className="card-img-top"
                  style={{
                    width: "100px",
                    marginLeft: "15px",
                    marginTop: "20px",
                    borderRadius: "100px",
                    border: "solid 2px #198754",
                  }}
                  alt="Patient 1"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <h6 className="name fw-500 text-uppercase color-d_black">
                      Sarah Johnson
                    </h6>
                    <span
                      className="position font-la fw-500 color-d_black"
                      style={{
                        color: "#198754",
                        fontSize: "15px",
                      }}
                    >
                      Regular Patient
                    </span>
                  </h5>
                  <p className="card-text">
                    <i>
                      "I am extremely satisfied with the LabCare appointment
                      system. The online scheduling feature is convenient, and I
                      appreciate the ease of accessing my lab reports online.
                      The staff is professional and helpful. LabCare has made
                      managing my medical appointments much simpler."
                    </i>
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div
                className="card h-100"
                style={{ border: "solid .5px #198754 !important" }}
              >
                <img
                  src={testimonial2}
                  className="card-img-top"
                  style={{
                    width: "100px",
                    marginLeft: "15px",
                    marginTop: "20px",
                    borderRadius: "100px",
                    border: "solid 2px #198754",
                  }}
                  alt="Patient 2"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <h6 className="name fw-500 text-uppercase color-d_black">
                      John Smith
                    </h6>
                    <span
                      className="position font-la fw-500 color-d_black"
                      style={{
                        color: "#198754",
                        fontSize: "15px",
                      }}
                    >
                      Long-time Patient
                    </span>
                  </h5>
                  <p className="card-text">
                    <i>
                      "LabCare's appointment system has simplified my healthcare
                      journey. Scheduling appointments is hassle-free, and I
                      appreciate the prompt notification reminders. The ability
                      to download lab reports online saves me time, and the
                      user-friendly interface makes navigation effortless. Thank
                      you, LabCare, for your excellent service!"
                    </i>
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div
                className="card h-100"
                style={{ border: "solid .5px #198754 !important" }}
              >
                <img
                  src={testimonial3}
                  className="card-img-top"
                  style={{
                    width: "100px",
                    marginLeft: "15px",
                    marginTop: "20px",
                    borderRadius: "100px",
                    border: "solid 2px #198754",
                  }}
                  alt="Patient 3"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <h6 className="name fw-500 text-uppercase color-d_black">
                      Emily Brown
                    </h6>
                    <span
                      className="position font-la fw-500 color-d_black"
                      style={{
                        color: "#198754",
                        fontSize: "15px",
                      }}
                    >
                      New Patient
                    </span>
                  </h5>
                  <p className="card-text">
                    <i>
                      "As a new patient, I found LabCare's appointment system to
                      be incredibly user-friendly. The online registration
                      process was seamless, and I received my appointment
                      details promptly. The convenience of accessing lab reports
                      online has been invaluable. I'm impressed by the
                      efficiency and professionalism of the LabCare team."
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /> <br /> <br /> <br />
      {/* Footer section */}
      <footer
        className="footer-1 footer-2 overflow-hidden"
        style={{
          backgroundImage: `url(${footerBg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "1000px",
        }}
      >
        <div className="footer-top__cta mb-80 mb-lg-60 mb-sm-50 mb-xs-40">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer-top__cta-content-wrapper pb-45">
                  <div className="footer-top__cta-content text-center mx-auto">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2 className="title color-white mb-20 mb-sm-10 mb-xs-5">
                      Feel Free To Contact Us
                    </h2>
                    <div className="description color-white font-la mb-40 mb-md-30 mb-sm-25 mb-xs-20 fw-500 mx-auto">
                      <p>
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old.
                      </p>
                    </div>
                    <br />

                    <Link
                      to="/home"
                      className="theme-btn btn-sm btn-yellow"
                      style={{ marginBottom: "30px" }}
                      title="(+94) 746 525 659"
                    >
                      Call Now: <i>(+94) 746 525 659</i>
                      <i className="fab fa-telegram-plane"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />

        <div className="footer-top mb-xs-25 mb-sm-30 mb-md-35 mb-lg-40 mb-50 overflow-hidden">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="single-footer-wid site_info_box d-flex">
                  <div>
                    <Link to="index.html" className="d-block mb-20">
                      <img
                        src={logo}
                        alt=""
                        style={{
                          width: "550px",
                          marginTop: "7px",
                          borderRadius: "4px",
                        }}
                      />
                    </Link>
                  </div>
                  <div style={{ width: "100px" }}></div>
                  <div className="description font-la color-white">
                    <p>
                      Welcome to LabCare, where we are committed to providing
                      top-notch medical services and empowering patients on
                      their healthcare journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className="footer-bottom overflow-hidden">
          <div className="container">
            <div className="footer-bottom-content d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="coppyright text-center text-md-start">
                <br />
                <br />
                <br />
                <br />
                &copy; {new Date().getFullYear()}{" "}
                <Link to="/home">LabCare</Link> | All Rights Reserved
              </div>

              <div className="footer-bottom-list last_no_bullet">
                <br />
                <br />
                <br />
                <ul>
                  <li>
                    <Link to="/home">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/home">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
