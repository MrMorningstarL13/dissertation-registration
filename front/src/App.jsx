import { useState } from 'react'

import s from './App.module.css'
import { Profile } from './components/student/profile/Profile'
import { EmailSignIn } from './components/SignIn/Email/EmailSignIn'
import { StudentSignIn } from './components/student/StudentSignIn/StudentSignIn';
import SessionSelection from './components/student/Application/SessionSelection';
import Navbar from './components/Navbar/Navbar';
import { StudApplication } from './components/student/Application/StudApplication'
import useUserStore from './stores/userStore';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import Applications from './components/Professor/Applications/Applications';
import { ProfProfile } from './components/Professor/Profile/ProfProfile';
import Session from './components/Professor/Sessions/Session';

function App() {
  const [isProfessor, setIsProfessor] = useState(0);
  const [formStep, setFormStep] = useState(0);
  console.log(formStep);
  const userName = useUserStore((state) => state.firstName);

  console.log(formStep)
  let currentComponent = <EmailSignIn setFormStep={setFormStep} setIsProfessor={setIsProfessor}></EmailSignIn>;

  if (!isProfessor)
    switch (formStep) {
      case 1: currentComponent = <StudentSignIn onSubmit={() => { setFormStep(() => formStep + 1) }}></StudentSignIn>
        break;

      case 2: currentComponent = <Profile />
        break;

      case 3: currentComponent = <StudApplication formStep={formStep} setFormStep={setFormStep} />
        break;

      case 4: currentComponent = <Session />
        break;

      default: <StudApplication formStep={formStep} setFormStep={setFormStep} />
        break;
    } else {
    console.log("Professor")
    switch (formStep) {

      case 2: currentComponent = <ProfProfile />
        break;

      case 3: currentComponent = <Applications />
        break;

      case 4: currentComponent = <Session />
        break;

      default: <Profile />
        break;
    }
  }



  return (
    <div id={s.app}>
      {userName ? <Navbar formStep={formStep} setFormStep={setFormStep}></Navbar> : null}
      <div className={s.componentContainer}>
        {currentComponent}
      </div>
    </div>
  )
}

export default App
