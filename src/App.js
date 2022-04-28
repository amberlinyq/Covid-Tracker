import React, { useState, useEffect } from 'react';
import {
	FormControl,
	Select,
	MenuItem,
	CardContent,
	Card,
} from '@mui/material';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './utility';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('Wordlewide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState('cases');
	const [mapCountries, setMapCountries] = useState([]);
	const [mapCenter, setMapCenter] = useState([42.546245, 23.424076]);
	const [mapZoom, setMapZoom] = useState(4);

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					const sortedData = sortData(data);
					setTableData(sortedData);
					setCountries(countries);
					setMapCountries(data);
				});
		};
		getCountriesData();
	}, []);

	const onChangeCountry = async (e) => {
		const countryCode = e.target.value;
		const url =
			countryCode === 'Wordlewide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);

				let latValue = data.countryInfo.lat;
				let lngValue = data.countryInfo.long;
				// setMapCenter({ lat: latValue, lng: lngValue });
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
			});
	};
	console.log('mapcenter inside app/', mapCenter);

	return (
		<div className='app'>
			<div className='app_left'>
				<div className='app__header'>
					<h1>Covid-19 Tracker</h1>
					<FormControl className='app_dropdown'>
						<Select
							variant='outlined'
							defaultValue='Wordlewide'
							value={country}
							onChange={onChangeCountry}
						>
							<MenuItem value={'Wordlewide'}>Wordlewide</MenuItem>
							{countries.map((country) => (
								<MenuItem key={country.name} value={country.value}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className='app__stats'>
					<InfoBox
						title='Coronavirus Cases'
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
						active={casesType === 'cases'}
						isRed
					/>
					<InfoBox
						title='Recovered'
						active={casesType === 'recovered'}
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title='Deaths'
						active={casesType === 'deaths'}
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
						isRed
					/>
				</div>
				<Map
					countries={mapCountries}
					casesType={casesType}
					mapCenter={mapCenter}
					zoom={mapZoom}
				/>
			</div>
			<div className='app_right'>
				<Card className='card'>
					<CardContent className='card_content'>
						<div className='right_table'>
							<h3>Lives Cases by Country</h3>
							<Table tableData={tableData} />
						</div>
						<div className='right_graph'>
							<h3>WordleWid new cases</h3>
							<LineGraph />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default App;
