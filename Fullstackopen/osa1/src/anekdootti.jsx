import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(null)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    if (selected === null) return
    const updateVotes = [...votes]
    updateVotes[selected] += 1
    setVotes(updateVotes)
  }

  const getMostVotedAnecdote = () => {
    const maxVotes = Math.max(...votes)
    const mostVotedIndex = votes.indexOf(maxVotes)
    return anecdotes[mostVotedIndex]
  }
  const isAnyVoteGiven = votes.some(vote => vote > 0)

  return (
    <div>
      <h1>Anecdote of the day</h1>

      {selected !== null && (
      <div>
        <div>{anecdotes[selected]}</div>
        <div>Has votes: {votes[selected]}</div>
        <Button handleClick={handleVote} text="Vote" />
      
      </div>
      )}
      
      <button onClick={handleRandomAnecdote}>Next anecdote</button>
      
      {isAnyVoteGiven && (
        <div>
          <h2>Most votes</h2>
          <div>{getMostVotedAnecdote()}</div>
      </div>
      )}
    </div>
  )
}

export default App