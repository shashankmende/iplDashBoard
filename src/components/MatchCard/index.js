// Write your code here
import './index.css'

const MatchCard = props => {
  const {card} = props
  const {
    competingTeam,
    competingTeamLogo,

    result,

    matchStatus,
  } = card
  console.log()

  const resultStyle = matchStatus === 'Lost' ? 'lostcss' : 'woncss'

  return (
    <li className="list-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-img"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={resultStyle}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
