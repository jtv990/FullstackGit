import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <p>{text}: {value}</p>
)

const Statistics = ({good,neutral,bad}) => {
  
  const total = good + neutral + bad
  const positivePercentage = total == 0 ? 0 : (good/total)*100
  const average = total === 0 ? 0 : (good-bad)/total
  
  if (total === 0){
    return <p>Palautetta ei ole annettu</p>
  }
  
  return (
    <div>
      <p>Tilastot:</p>
      <StatisticLine text="Hyvä" value ={good} />
      <StatisticLine text="OK" value ={neutral} />
      <StatisticLine text="Huono" value ={bad} />
      <StatisticLine text="Yhteensä" value ={total} />
      <StatisticLine text="Keskiarvo" value ={average} />
      <StatisticLine text="Positiivinen palaute" value ={positivePercentage.toFixed(2)} />
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    
    <h1>Palautenappi:</h1>
    <Button onClick={() => setGood(good + 1)} text="Hyvä" />
    <Button onClick={() => setNeutral(neutral + 1)} text="OK" />
    <Button onClick={() => setBad(bad + 1)} text="Huono" />
    <Statistics good={good} neutral={neutral} bad={bad} />
  </div>
  )
}

export default App