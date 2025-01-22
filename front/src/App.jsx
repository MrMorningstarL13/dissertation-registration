import { useState } from 'react'

import './App.css'
import { Profile } from './components/student/profile/Profile'
import { EmailSignIn } from './components/SignIn/Email/EmailSignIn'
import { StudentSignIn } from './components/student/StudentSignIn/StudentSignIn';

function App() {
  const [userType, setUserType] = useState(0);
  const [formStep, setFormStep] = useState(0);

  const onSubmitEmail = (values)=>{
    setFormStep(formStep+1);
    console.log(formStep);
  }

  let currentComponent = <EmailSignIn onSubmit={onSubmitEmail} ></EmailSignIn>;

  switch (formStep) {
    case 1: currentComponent = <StudentSignIn></StudentSignIn>

      break;

    default:
      break;
  }

  return (
    <>
      {currentComponent}
    </>
  )
}

export default App
