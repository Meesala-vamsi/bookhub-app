import {Component} from 'react'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

const viewsOptions = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    changeOption: 'ALL',
    bookshelvesFilteredData: [],
    inputElement: '',
    hello: '',
    viewList: viewsOptions.initial,
    booksId: 'All',
  }

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const {changeOption, inputElement} = this.state
    this.setState({viewList: viewsOptions.inProgress})
    console.log(changeOption)
    const accessToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${changeOption}&search=${inputElement}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const filteredData = data.books.map(eachItem => ({
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        rating: eachItem.rating,
        readStatus: eachItem.read_status,
        title: eachItem.title,
        id: eachItem.id,
      }))

      this.setState({
        bookshelvesFilteredData: filteredData,
        viewList: viewsOptions.success,
      })
    } else {
      this.setState({viewList: viewsOptions.failure})
    }
  }

  searchBooks = event => {
    this.setState({inputElement: event.target.value})
  }

  getBooks = () => {
    const {bookshelvesFilteredData, hello} = this.state

    const filteredData = bookshelvesFilteredData.filter(eachItem =>
      eachItem.title.toLowerCase().includes(hello),
    )

    return filteredData
  }

  selectBookshelvesBtn = (id, label) => {
    const filteredData = bookshelvesList.filter(eachItem => eachItem.id === id)
    this.setState(
      {changeOption: filteredData[0].value, booksId: label},
      this.fetchDetails,
    )
  }

  onclickSearchIcon = () => {
    const {inputElement} = this.state
    this.setState({hello: inputElement}, this.getBooks)
  }

  searchNotFound = () => {
    const {inputElement} = this.state
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/db0f83m76/image/upload/v1699267062/Asset_1_1_yh4lhl.png"
          className="search-not-found-image"
          alt="no books"
        />
        <p className="failure-desc">{`Your search for ${inputElement} did not find any matches.`}</p>
      </div>
    )
  }

  successView = () => {
    const getSearchBooks = this.getBooks()
    console.log(getSearchBooks.length)
    if (getSearchBooks.length === 0) {
      return this.searchNotFound()
    }
    return (
      <div className="shelves-success-view-container">
        <ul className="shelves-success-list-container">
          {getSearchBooks.map(eachItem => (
            <li className="shelves-success-list-items">
              <Link
                to={`/books/${eachItem.id}`}
                className="nav-link"
                key={eachItem.id}
              >
                <img
                  src={eachItem.coverPic}
                  className="shelves-success-image"
                  alt={eachItem.title}
                />
              </Link>
              <div className="shelves-image-desc-container">
                <h1 className="shelves-title">{eachItem.title}</h1>
                <p className="shelves-author">{eachItem.authorName}</p>
                <div className="rating-container">
                  <p className="avg-text">Avg Rating</p>
                  <BsFillStarFill className="rating-icon" />
                  <p className="rating-text">{eachItem.rating}</p>
                </div>
                <div className="status-container">
                  <p className="read-status">
                    Status:
                    {eachItem.readStatus}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="shelves-failure-container">
      <img
        src="https://res.cloudinary.com/db0f83m76/image/upload/v1699183450/Group_7522_kml8qp.png"
        alt="failure view"
        className="book-shelves-failure-image"
      />
      <p className="failure-desc">Something went wrong. Please try again</p>
      <button type="button" className="try-again-btn">
        Try Again
      </button>
    </div>
  )

  renderView = () => {
    const {viewList} = this.state

    switch (viewList) {
      case viewsOptions.success:
        return this.successView()
      case viewsOptions.failure:
        return this.failureView()
      case viewsOptions.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  render() {
    const {booksId, inputElement} = this.state
    return (
      <div>
        <Header />
        <div className="mobile-bookshelves-container">
          <div className="mobile-search-container">
            <input
              type="search"
              className="mobile-search-element"
              onChange={this.searchBooks}
              value={inputElement}
            />
            <button
              className="search-icon-button"
              type="button"
              testid="searchButton"
            >
              <BsSearch
                className="search-icon"
                onClick={this.onclickSearchIcon}
              />
            </button>
          </div>
          <div className="render-container">
            <div className="bookshelves-items-container">
              <h1 className="bookshelves-heading">Bookshelves</h1>
              <ul className="mobile-bookshelves-list-container">
                {bookshelvesList.map(eachItem => (
                  <>
                    <li className="mobile-list-items" key={eachItem.id}>
                      <button
                        type="button"
                        className="mobile-list-button"
                        onClick={() => {
                          this.selectBookshelvesBtn(eachItem.id, eachItem.label)
                        }}
                      >
                        {eachItem.label}
                      </button>
                    </li>
                    <li className="desktop-list-items" key={eachItem.id}>
                      <p
                        className="mobile-list-button"
                        onClick={() => {
                          this.selectBookshelvesBtn(eachItem.id, eachItem.label)
                        }}
                      >
                        {eachItem.label}
                      </p>
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className="render-search-container for-height">
              <div className="container4">
                <h1 className="all-books-heading">{`${booksId}`} Books</h1>
                <div className="desktop-search-container">
                  <input
                    type="search"
                    className="mobile-search-element"
                    onChange={this.searchBooks}
                    value={inputElement}
                  />
                  <button
                    className="search-icon-button"
                    type="button"
                    testid="searchButton"
                  >
                    <BsSearch
                      className="search-icon"
                      onClick={this.onclickSearchIcon}
                    />
                  </button>
                </div>
              </div>

              {this.renderView()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
