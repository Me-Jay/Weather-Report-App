import React from 'react';

export default React.createContext({
    token: null,
    login: (token, email) => { },
    logout: () => { },
    lastFiveSearches: [],
    email: "",
    saveSearch: (weatherData) => { }
})