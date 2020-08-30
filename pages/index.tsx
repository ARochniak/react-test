import { Paper, Grid, TextField, Button } from '@material-ui/core'
import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'

const Home = (): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const router = useRouter()

  const usernameInputRef = useRef<HTMLInputElement>()

  const userNameChangeHandler = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    if (isError) setIsError(false)
    const username = e.currentTarget.value
    setUsername(username)
  })

  const passwordChangeHandler = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value
    setPassword(password)
  })

  const errorHandler = useCallback(() => {
    setIsError(true)
    usernameInputRef.current.focus()
    usernameInputRef.current.setSelectionRange(0, usernameInputRef.current.value.length)
  })

  const submitHandler = useCallback(async (): void => {
    const body = JSON.stringify({ username, password })
    const response = await fetch('http://localhost:3000/api/login', { method: 'POST', body })
    if (response.ok) {
      const json: { token: string } = await response.json()
      localStorage.setItem('token', json.token)
      router.push('/table')
    } else {
      errorHandler()
    }
  })

  const keyDownHandler = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || (e.target as HTMLElement).tagName === 'BUTTON') return
    submitHandler()
  })

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
      <Paper style={{ padding: 30 }} onKeyDown={keyDownHandler}>
        <Grid container>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                inputRef={usernameInputRef}
                error={isError}
                id="username"
                label="Username"
                type="text"
                onChange={userNameChangeHandler}
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={passwordChangeHandler}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button
              type="submit"
              onClick={submitHandler}
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Home
