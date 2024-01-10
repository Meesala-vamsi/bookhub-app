import Slider from 'react-slick'
import {Link, withRouter} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {books, history} = props
  const onClickFindBooks = () => {
    history.push('/shelf')
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className="slick-main-container">
      <div className="some-container">
        <h1 className="top-rated-heading">Top Rated Books</h1>
        <button
          type="button"
          className="find-books-btn"
          onClick={onClickFindBooks}
        >
          Find Books
        </button>
      </div>
      <Slider {...settings} className="slick-container">
        {books.map(eachItem => (
          <li key={eachItem.id}>
            <Link to={`/books/${eachItem.id}`} className="nav-link">
              <img
                src={eachItem.coverPic}
                className="desktop-cover-pic"
                alt=""
              />
            </Link>
            <div className="cover-list-container">
              <h1 className="books-title">{eachItem.title}</h1>
              <p className="books-author-name">{eachItem.authorName}</p>
            </div>
          </li>
        ))}
      </Slider>
    </div>
  )
}

export default withRouter(ReactSlick)
