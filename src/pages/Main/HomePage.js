import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import WeatherCard from '../../components/WeatherCard';
import HomeWeatherCard from '../../components/HomeWeatherCard';
import SearchBar from '../../components/SearchBar';
import { Spinner, Alert } from 'react-bootstrap';
import AuthContext from '../../context/auth-context'


const HomePageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12.1rem;
`;

const SearchWrapper = styled.div`
    width: 60%;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;

const LastSearchesWrapper = styled.div`
    width: 40%;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;

const SearchAndRecentWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;

    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`;
const HomePage = () => {
    const [location, setLocation] = useState({
        country: "",
        city: "",
        region: "",
        suburb: ""
    });
    const [homeWeather, setHomeWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchedWeather, setSearchedWeather] = useState(null);
    const [error, setError] = useState({
        homeError: null,
        searchError: null
    });
    const [lastFiveWeatherInfo, setLastFiveWeatherInfo] = useState([]);
    const { token, lastFiveSearches, saveSearch } = useContext(AuthContext);

    useEffect(() => {

        function getInitialLocationCoordinates() {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(result => {
                        const { coords } = result;
                        const coordinates = {
                            longitude: coords.longitude,
                            latitude: coords.latitude
                        }
                        resolve(coordinates);
                    }, error => {
                        reject(error);
                    })
                }
            })
        }

        async function getLocation() {
            try {
                const { longitude, latitude } = await getInitialLocationCoordinates();
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=13e8a601fda84afab64ceb760c06bf07 `);

                const locationData = await response.json();

                setLocation({
                    ...location,
                    country: locationData.results[0].components.country,
                    city: locationData.results[0].components.city || locationData.results[0].components.county,
                    region: locationData.results[0].components.state,
                    suburb: locationData.results[0].components.suburb || locationData.results[0].components.village
                });

            } catch (error) {
                console.log(error)
            }
        }
        getLocation();
    }, []);


    useEffect(() => {
        async function getLocationWeather() {
            try {
                if (location.city) {
                    const response = await fetch(`http://api.weatherstack.com/current?access_key=cb0244f70672c0761d0295b1bb61774b&query=${location.region}`);
                    const weatherData = await response.json();

                    setHomeWeather(weatherData);

                    if (weatherData.error) {
                        setError({
                            ...error,
                            homeError: "Error Occurred! Refresh"
                        })
                        return;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        getLocationWeather();

    }, [location]);

    const handleSearch = async (searchLocation) => {
        try {
            setLoading(true);
            if (error.searchError) {
                setError({
                    ...error,
                    searchError: null
                })
            }
            const response = await fetch(`http://api.weatherstack.com/current?access_key=cb0244f70672c0761d0295b1bb61774b&query=${searchLocation}`);
            const weatherData = await response.json();

            if (weatherData.error) {
                setError({
                    ...error,
                    searchError: "Invalid city or country name"
                })
                return;
            }

            setSearchedWeather(weatherData);
            setLoading(false);


            if (token) {
                saveSearch(weatherData);
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <HomePageWrapper className="">
            {
                homeWeather
                    ? <HomeWeatherCard weatherInfo={homeWeather} locationInfo={location} />
                    :
                    <>
                        {
                            !error.homeError
                                ? <SpinnerWrapper>
                                    <Spinner animation="border" className="mx-auto" />
                                </SpinnerWrapper>
                                : <Alert variant="danger" style={{ width: "90%" }} className="mx-auto">
                                    {error.homeError}
                                </Alert>
                        }
                    </>
            }
            <SearchBar handleSearch={handleSearch} />
            {
                error.searchError &&
                <Alert variant="danger" style={{ width: "90%" }} className="mx-auto">
                    {error.searchError}
                </Alert>
            }
            {
                <SearchAndRecentWrapper>
                    {
                        (searchedWeather && error.searchError === null)
                        &&
                        <SearchWrapper className="d-flex flex-column mx-3">
                            <h3>Search Result</h3>
                            <WeatherCard weatherInfo={searchedWeather} locationInfo={location} />
                        </SearchWrapper>
                    }
                    {
                        lastFiveSearches.length !== 0 &&
                        <LastSearchesWrapper className="d-flex flex-column mx-3">
                            <h3>Recent Searches</h3>
                            {
                                lastFiveSearches.map((weatherInfo, index) => {
                                    return <WeatherCard key={index} weatherInfo={weatherInfo} locationInfo={location} />
                                })
                            }
                        </LastSearchesWrapper>
                    }

                </SearchAndRecentWrapper>
            }

        </HomePageWrapper>
    );
}

export default HomePage;