import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'antd'

const Home: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    nav('/login')
  }

  return (
    <>
      <p>
        Home <Button>antd button</Button>
      </p>
      <div>
        <button onClick={clickHandler}>login</button>
        <Link to="/register">register</Link>
      </div>
    </>
  )
}

export default Home
