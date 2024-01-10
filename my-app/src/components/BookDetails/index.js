import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const viewsOptions = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
}

class BookDetails extends Component {
  state = {bookDetails: [], viewsName: viewsOptions.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({viewsName: viewsOptions.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const requestToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${requestToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const filteredData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }

      this.setState({
        bookDetails: filteredData,
        viewsName: viewsOptions.success,
      })
    } else {
      this.setState({viewsName: viewsOptions.failure})
    }
  }

  successView = () => {
    const {bookDetails} = this.state
    return (
      <div className="book-details-success">
        <div className="book-details-image-container">
          <img
            src={bookDetails.coverPic}
            alt={bookDetails.title}
            className="book-details-cover-pic"
          />
          <div className="book-details-desc-container">
            <h1 className="book-details-heading">{bookDetails.title}</h1>
            <p className="book-details-author-name">{bookDetails.authorName}</p>
            <div className="book-details-rating-container">
              <p className="avg-text">Avg Rating</p>
              <BsFillStarFill className="rating-icon" />
              <p className="rating-text">{bookDetails.rating}</p>
            </div>
            <div className="book-details-status-container">
              <p className="read-status">
                Status:
                {bookDetails.readStatus}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h1 className="about-text">About Author</h1>
          <p className="book-details-about-desc">{bookDetails.aboutAuthor}</p>
        </div>
        <div>
          <h1 className="about-text">About Book</h1>
          <p className="book-details-about-desc">{bookDetails.aboutBook}</p>
        </div>
        <Footer />
      </div>
    )
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getBookDetails()
  }

  failureView = () => (
    <div className="shelves-failure-container">
      <img
        src="https://res.cloudinary.com/db0f83m76/image/upload/v1699183450/Group_7522_kml8qp.png"
        alt="failure view"
        className="book-shelves-failure-image"
      />
      <p className="failure-desc">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderView = () => {
    const {viewsName} = this.state
    switch (viewsName) {
      case viewsOptions.success:
        return this.successView()
      case viewsOptions.failure:
        return this.failureView()
      case viewsOptions.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className='book-details-bg'>
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default BookDetails
