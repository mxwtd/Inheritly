import { Outlet, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from '../services/authApiSlice'
import usePersist from '../../../hook/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          // const response =
          await refresh()
          // const { accessToken } = response.data
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    // eslint-disable-next-line no-return-assign
    return () => effectRan.current = true

    // eslint-disable-next-line
  }, [])

  let content
  if (!persist) { // persist: no
    console.log('no persist')
    content = <Outlet />
  } else if (isLoading) { // persist: yes, token: no
    console.log('loading')
    content = <p>Loading...</p>
  } else if (isError) { // persist: yes, token: no
    console.log('error')
    content = (
      <h1>
        {error.data?.message}
        <Link to='/login'>Please login again</Link>.
      </h1>
    )
  } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
    console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) { // persist: yes, token: yes
    console.log('token and uninitialized')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}

export default PersistLogin
