import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Main/HomePage';
import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import AuthContext from './context/auth-context'

function App() {
  const existingToken = localStorage.getItem('authToken') || null;
  const existingEmail = localStorage.getItem('authEmail') || null;
  const [token, setToken] = useState(existingToken);
  const [userEmail, setUserEmail] = useState(existingEmail);
  const [lastSearches, setLastSearches] = useState([]);
  const NUMBER_OF_SEARCHES_TO_SAVE = 5;

  const login = (token, email) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authEmail', email)
    setUserEmail(email);
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    setToken(null);
    setUserEmail(null);
    window.location.reload();
  }

  const saveSearch = weatherData => {
    const tempArray = lastSearches;
    if (lastSearches.length === NUMBER_OF_SEARCHES_TO_SAVE) {
      tempArray.pop();
    }

    setLastSearches([weatherData, ...tempArray]);

    const userData = JSON.parse(localStorage.getItem(userEmail));

    if (userData) {
      userData.lastFiveSearches = [...lastSearches];
      localStorage.setItem(userEmail, JSON.stringify(userData));
    }
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(userEmail));

    if (userInfo) {
      setLastSearches([...userInfo.lastFiveSearches]);
    }
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ token: token, login: login, logout: logout, email: userEmail, lastFiveSearches: lastSearches, saveSearch: saveSearch }}>
          <Switch>
            {
              token && <Redirect path="/auth" to="/home" />
            }

            <Redirect path="/" to="/home" exact />
            <Route exact path="/auth" component={AuthPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/home" render={() => (
              <MainLayout>
                <HomePage />
              </MainLayout>
            )} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
