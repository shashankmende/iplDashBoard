// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {team} = props
  const {id, name, teamImageUrl} = team
  return (
    <Link className="card-link-item" to={`/team-matches/${id}`}>
      <li className="list-item">
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
