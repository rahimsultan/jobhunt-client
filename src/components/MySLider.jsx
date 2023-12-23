import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const MySLider = () => {
  const [sliderRef, setSliderRef] = useState(null)
  const sliderContainer={
    // width: '1600px',
    margin: '0px auto',
    // padding: '0px 152px',
    position: 'relative'
  }

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: '0',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: '0',
          slidesToShow: 1
        }
      }
    ]
    
  };
  return (
    <div style={sliderContainer} >
      <div className='sliderTitleBlock flex-col gap-5 md:flex-row'>
        <h1 className='sliderTitle'>Most Dedicated <br /><span className='sliderTitleBold'>Team Members</span></h1>
      <div className='controls'>
        <div onClick={sliderRef?.slickPrev} className='arrow'>
          <AiOutlineArrowLeft/>
        </div>
        <div onClick={sliderRef?.slickNext} className='arrow'>
          <AiOutlineArrowRight/>
        </div>
      </div>
      </div>
    <Slider ref={setSliderRef} {...settings}>
      <div className="sliderContent">
        <div className="sliderImage">
        <img src="https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?w=1380&t=st=1699377305~exp=1699377905~hmac=b12f2a0d5e46c014ba5c4f96b980e637cf82cb4f7eb99951e4c3d8619a6d149a" alt="" />
        </div>
        <h3 >Implementer</h3>
      </div>
      <div className="sliderContent">
      <div className="sliderImage">
      <img src="https://img.freepik.com/free-photo/african-female-graduate-smiling-holding-diploma_176420-14312.jpg?w=1380&t=st=1699377328~exp=1699377928~hmac=5859790facc8c92dbddce8105dbc912c7b9f67abad691a1e1c29ab4c902f3f01" alt="" />
      </div>
        <h3>Completer finisher</h3>
      </div>
      <div className="sliderContent">
      <div className="sliderImage">
      <img src="https://img.freepik.com/free-photo/handsome-bearded-businessman-rubbing-hands-having-deal_176420-18778.jpg?w=1380&t=st=1699377400~exp=1699378000~hmac=fcb280703f02be2afb232370aba0e90b786a3b7a65189e36590e43a00448bfec" alt="" />
      </div>
        <h3>Monitor evaluator</h3>
      </div>
      <div className="sliderContent">
        <div className="sliderImage">
        <img src="https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed-white-background_23-2148222620.jpg?w=740&t=st=1699377435~exp=1699378035~hmac=262b7dc26ed8116bd160552b3324e63baca157773d817c0aeb5d789ed614d292" alt="" />
        </div>
        <h3>Resource investigator</h3>
      </div>
      <div className="sliderContent">
      <div className="sliderImage">
      <img src="https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg?w=1380&t=st=1699377484~exp=1699378084~hmac=d0beb919c1bef7d67374425aab06a31ded2a1f3dbdcca7bbab9931fae95bafc6" alt="" />
      </div>

        <h3>Teamworker</h3>
      </div>

    </Slider>
    </div>
  )
}

export default MySLider