// Write your code here
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import {Component} from 'react'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    recentMatch: [],
    latestMatch: {},
    teamBannerUrl: '',
  }

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const latestMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      id: data.latest_match_details.id,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondsInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }

    const recentMatches = data.recent_matches.map(each => ({
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      date: each.date,
      firstInnings: each.first_innings,
      id: each.id,
      manOfTheMatch: each.man_of_the_match,
      matchStatus: each.match_status,
      result: each.result,
      secondsInnings: each.second_innings,
      umpires: each.umpires,
      venue: each.venue,
    }))
    const teamBannerUrl = data.team_banner_url

    this.setState({
      recentMatch: recentMatches,
      latestMatch: latestMatchDetails,
      teamBannerUrl,
      isLoading: false,
    })
  }

  renderTeamMatches = () => {
    const {latestMatch, recentMatch, teamBannerUrl} = this.state
    const {
      competingTeam,
      competingTeamLogo,
      date,
      firstInnings,
      manOfTheMatch,
      result,
      secondsInnings,
      umpires,
      venue,
    } = latestMatch
    return (
      <div className="team-matches-container">
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="team-banner-img"
        />
        <p className="latest-match">Latest Matches</p>
        <div className="latest-match-details-container">
          <div className="left-container">
            <p>{competingTeam}</p>
            <p>{date}</p>
            <p>{venue}</p>
            <p>{result}</p>
          </div>
          <img src={competingTeamLogo} alt={`latest match ${competingTeam}`} />
          <div className="right-container">
            <h1>First Innings</h1>
            <p>{firstInnings}</p>
            <h1>Second Innings</h1>
            <p>{secondsInnings}</p>
            <h1>Man Of The Match</h1>
            <p>{manOfTheMatch}</p>
            <h1>Umpires</h1>
            <p>{umpires}</p>
          </div>
        </div>
        <ul className="match-card-container">
          {recentMatch.map(each => (
            <MatchCard card={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? (
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
      </div>
    ) : (
      this.renderTeamMatches()
    )
  }
}

export default TeamMatches
