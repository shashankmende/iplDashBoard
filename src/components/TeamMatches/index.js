// Write your code here
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import {Link} from 'react-router-dom'
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

  renderStatistics = recentMatch => {
    const winCount = recentMatch.filter(each => each.matchStatus === 'Won')
      .length
    const loseCount = recentMatch.filter(each => each.matchStatus === 'Lost')
      .length
    const drawCount = recentMatch.filter(each => {
      if (each.matchStatus !== 'Won' && each.matchStatus !== 'Lost') {
        return true
      }
      return false
    }).length
    console.log('win list=', winCount)
    console.log('lost count=', loseCount)
    console.log('draw count=', drawCount)

    const data = [
      {
        count: winCount,
        result: 'Won',
      },
      {
        count: loseCount,
        result: 'Lost',
      },
      {
        count: drawCount,
        result: 'Draw',
      },
    ]

    return (
      <>
        <h1>Team Statistics</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="70%"
              cy="40%"
              data={data}
              startAngle={0}
              endAngle={360}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="Won" fill="#fecba6" />
              <Cell name="Lost" fill="#b3d23f" />
              <Cell name="Draw" fill="#a44c9e" />
            </Pie>
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
        </ResponsiveContainer>
      </>
    )
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
      <>
        <div className="team-matches-container">
          <Link to="/">
            <button type="button" className="back-button">
              Back
            </button>
          </Link>
          <img
            src={teamBannerUrl}
            alt="team banner"
            className="team-banner-img"
          />
          <p className="latest-match">Latest Matches</p>
          <div className="latest-match-details-container">
            <div className="left-container">
              <div>
                <p>{competingTeam}</p>
                <p>{date}</p>
                <p>{venue}</p>
                <p>{result}</p>
              </div>
              <img
                src={competingTeamLogo}
                alt={`latest match ${competingTeam}`}
                className="competing-team-logo small-devices"
              />
            </div>
            <img
              src={competingTeamLogo}
              alt="latest match {competing_team}"
              className="competing-team-logo large-devices"
            />

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
          <div>{this.renderStatistics(recentMatch)}</div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? (
      <div data-testid="loader" className="loader-container">
        <Loader type="Oval" color="blue" height={50} width={50} />
      </div>
    ) : (
      <div>{this.renderTeamMatches()}</div>
    )
  }
}

export default TeamMatches
