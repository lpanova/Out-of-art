import React, { useContext } from 'react';
import { userAuthContext } from '../../context/UserAuthentication';
import NavigationLogged from './NavigationLogged';
import NavigationNotLogged from './NavigationNotLogged';

function Header() {
  const { userAuth } = useContext(userAuthContext);
  return (
    <div>
      {userAuth.username ? <NavigationLogged /> : <NavigationNotLogged />}
    </div>
  );
}

export default Header;
