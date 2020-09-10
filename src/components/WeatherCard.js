import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import formatDate from '../helpers/formatDate'

const { Body, Text, Subtitle, Title } = Card;
const StyledWeatherCard = styled(Card)`
    width: 70%;

    @media screen and (max-width: 768px){
        width: 90%;
    }
`;
const WeatherGraphic = styled.img``;                    
const WeatherInfoWrapper = styled.div``;
const DateInfo = styled.span``;
const WeatherTemperature = styled.span`
    font-weight: bold;
    font-size: 3rem;
`;
const WeatherDescription = styled.span`
    display: flex;
`;
const LocationInformation = styled.span``;

const WeatherCard = ({ weatherInfo: { current, location, request } }) => {
    const { weather_icons: [imageURL], temperature, weather_descriptions: [description], feelslike } = current;
    const { name, country, region } = location;
    const currentDate = new Date();

    return (
        <StyledWeatherCard className="my-2">
            <Body className="d-flex flex-row">
                <WeatherGraphic src={imageURL} className="m-2 mr-2" width="125" height="135" />
                <WeatherInfoWrapper className="d-flex flex-column ml-2">
                    <WeatherTemperature>
                        <Text>
                            {temperature}
                            <span className="font-weight-lighter">
                                &deg;C
                            </span>
                        </Text>
                    </WeatherTemperature>
                    <WeatherDescription>
                        <Text className="text-muted">
                            {description}
                        </Text>
                    </WeatherDescription>
                    <LocationInformation>
                        <span className="font-weight-bold">
                            {name},
                        </span>
                        <span className="ml-1">
                            {region}
                        </span>
                    </LocationInformation>
                    <DateInfo>
                        {formatDate(currentDate)}
                    </DateInfo>
                </WeatherInfoWrapper>
            </Body>
        </StyledWeatherCard>
    );
}

export default WeatherCard;