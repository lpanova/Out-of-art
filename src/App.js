import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';
import UserAuthentication from './context/UserAuthentication';
import Header from './components/header/Header';

function App() {
  return (
    <div>
      <UserAuthentication>
        <Header />
        <AppRouter />
      </UserAuthentication>
    </div>
  );
}

export default App;
