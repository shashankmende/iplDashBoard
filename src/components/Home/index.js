// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import TeamCard from '../TeamCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamCard()
  }

  getTeamCard = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({
      teamsList: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {teamsList, isLoading} = this.state
    console.log(teamsList)
    return isLoading ? (
      <div data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
      </div>
    ) : (
      <div className="home-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        <ul className="cards-container">
          {teamsList.map(each => (
            <TeamCard team={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
