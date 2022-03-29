import React from 'react'
import ErrorImage from '../Resources/Images/404Errorpng.png'
import '../Resources/Styles/Pages/ErrorPage.css'

const ErrorPage = () => {
  const back = () => {
    window.history.go(-2)
  }

  return (
    <div className='ErrorPage'>
        <div className='errorImage'>
         <img onClick={back} src={ErrorImage} />
         </div>
        </div>
  )
}

export default ErrorPage