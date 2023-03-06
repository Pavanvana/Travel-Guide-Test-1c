import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

class Home extends Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount = () => {
    this.getTravelGuideDetails()
  }

  getTravelGuideDetails = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const upDatedData = data.packages.map(each => ({
        id: each.id,
        description: each.description,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({data: upDatedData, isLoading: false})
    }
  }

  isRenderLoadingView = () => (
    <div className="travel-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  isRenderSuccessView = () => {
    const {data} = this.state
    return (
      <ul className="travel-places">
        {data.map(eachData => (
          <li key={eachData.id} className="each-travel-place">
            <img
              className="image"
              src={eachData.imageUrl}
              alt={eachData.name}
            />
            <h1 className="each-travel-heading">{eachData.name}</h1>
            <p className="each-travel-description">{eachData.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Travel Guide</h1>
        {isLoading ? this.isRenderLoadingView() : this.isRenderSuccessView()}
      </div>
    )
  }
}

export default Home
