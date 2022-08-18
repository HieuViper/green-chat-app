import { Route } from 'react-router-dom';
import './App.css';
import ChatPage from './Pages/ChatPage';
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/sign-up" exact component={SignUpPage} />
      <Route path="/sign-in" exact component={SignInPage} />
      <Route path="/chats" component={ChatPage} />
      <Toaster
        position="top-right"
        reverseOrder={false} />
    </div>
  );
}

export default App;
