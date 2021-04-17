import React from 'react';

import {AuthConsumer} from './auth/auth-context';

const Navigation = () => {
  return (
    <div>
      <AuthConsumer>
        {({ isAuth, login }) => (
          <div>
            {isAuth ? (
              <div>NavMenu</div>
            ) : (
              <button onClick={login}>login</button>
            )}
          </div>
        )}
      </AuthConsumer>
    </div>
  )
}

export default Navigation
