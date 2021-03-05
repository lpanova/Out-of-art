import React, { useContext } from 'react';
import { userAuthContext } from '../../context/UserAuthentication';

function UserName(props) {
  const { userAuth } = useContext(userAuthContext);

  return (
    <div>
      The user is {userAuth.username ? 'yes' : 'no'}
      <div>{userAuth.username}</div>
    </div>
  );
}

export default UserName;
