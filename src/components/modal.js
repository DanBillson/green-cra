import React, { useState, useEffect } from 'react'
import createPersistedState from 'use-persisted-state'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ReactComponent as Check } from '../assets/check.svg'

const useEmail = createPersistedState('email')
const useRememberEmail = createPersistedState('rememberEmail')

// eslint-disable-next-line
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const Modal = () => {
  const [email, setEmail] = useState('')
  const [remember, setRemember] = useRememberEmail(false)
  const [storedEmail, setStoredEmail] = useEmail('')
  const [error, setError] = useState('')
  // Just for example
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!remember || !storedEmail) {
      setStoredEmail('')
      setEmail('')
      return
    }

    setEmail(storedEmail)
  }, [remember, storedEmail, setStoredEmail, setEmail])

  const handleClick = () => {
    if (!emailRegex.test(email)) {
      setError('You must provide a valid email')
      setSuccess(false)
      return
    }

    remember && setStoredEmail(email)
    setError('')
    setSuccess(true)
    // navigate to dashboard
  }

  return (
    <div className="modal">
      <Logo className="logo" />
      <h1>Example login screen</h1>
      <h4>Getting started with Green.</h4>
      <div className="inputContainer">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="checkboxContainer">
        <input
          id="remember"
          type="checkbox"
          checked={remember}
          onClick={() => setRemember(!remember)}
        />
        <span
          onClick={() => setRemember(!remember)}
          className={remember ? 'checked' : ''}
        >
          <Check />
        </span>
        <label htmlFor="remember">Remember this device</label>
      </div>
      {error ? <span className="message error">{error}</span> : null}
      <button onClick={handleClick}>Sign In</button>
      {success ? <span className="message success">Login success</span> : null}
    </div>
  )
}

export default Modal
