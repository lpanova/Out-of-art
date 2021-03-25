import './App.css';
import AppRouter from './AppRouter';
import UserAuthentication from './context/UserAuthentication';
import Header from './components/header/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="main">
      <UserAuthentication>
        <Header />
        <AppRouter />
        <Footer />
      </UserAuthentication>
    </div>
  );
}

export default App;
