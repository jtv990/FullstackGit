import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const positivePercentage = total == 0 ? 0 : (good/total)*100
  const average = total === 0 ? 0 : (good-bad)/total


  return (
    <div>
      <h1>Palautenappi:</h1>
      <button onClick={() => setGood(good + 1)}>
        Hyvä {good}
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        OK {neutral}
      </button>
      <button onClick={() => setBad(bad + 1)}>
        Huono {bad}
      </button>

      <p>Hyvä: {good}</p>
      <p>OK: {neutral}</p>
      <p>Huono: {bad}</p>
      <p>Yhteensä: {total}</p>
      <p>Keskiarvo: {average}</p>
      <p>Positiivinen palaute: {positivePercentage.toFixed(2)}%</p>
    </div>
  )
}

export default App