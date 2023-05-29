import { Link } from 'react-router-dom'

const LoginAgain = ({ errorMsg }) => {
  return (
    <h1>
      {errorMsg}
      <Link to='/login'>Please login again</Link>.
    </h1>
  )
}

export default LoginAgain
