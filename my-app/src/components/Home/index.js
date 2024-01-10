import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'

import './index.css'

const dataLoad = {
  isLoading: 'LOADING',
  initial: 'INITIAL',
  SUCCESS: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBooks: [], forLoad: ''}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    this.getDetails(jwtToken)
  }

  getDetails = async jwtToken => {
    this.setState({forLoad: dataLoad.isLoading})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'

    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const filteredData = data.books.map(eachItem => ({
        id: eachItem.id,
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        title: eachItem.title,
      }))
      console.log(filteredData.id)

      this.setState({topRatedBooks: filteredData, forLoad: dataLoad.success})
    } else {
      this.setState({forLoad: dataLoad.failure})
    }
  }

  findBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  onClickTryAgain = () => {
    this.getDetails()
  }

  hello = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  successView = () => {
    const {topRatedBooks} = this.state
    return (
      <>
        <ReactSlick books={topRatedBooks} />
        <Footer />
      </>
    )
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

  loadingView = () => (
    <div className="slick-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderDetails = () => {
    const {forLoad} = this.state
    switch (forLoad) {
      case dataLoad.success:
        return this.successView()
      case dataLoad.failure:
        return this.failureView()
      case dataLoad.isLoading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="mobile-find-books-btn"
            type="button"
            onClick={this.findBooks}
          >
            Find Books
          </button>
          {this.renderDetails()}
        </div>
      </>
    )
  }
}

export default Home
