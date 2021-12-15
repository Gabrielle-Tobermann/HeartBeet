import React from 'react';
import { signInUser } from '../../helpers/auth';

export default function Home() {
  return (
    <div>
       <button onClick={signInUser}>Sign In</button>
    </div>
  );
}
