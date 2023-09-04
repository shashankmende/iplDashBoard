// Write your code here
import './index.css'
import {Component} from 'react'

class TeamMatches extends Component {
  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp,in/ipl/${id}`)
    const data = await response.json()
    console.log('data in tema matches = ', data)
  }

  render() {
    return <h1>Hi from team matches</h1>
  }
}

export default TeamMatches
