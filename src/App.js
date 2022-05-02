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
import { prettyPrintStat } from './utility';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('Wordlewide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState('cases');
	const [mapCountries, setMapCountries] = useState([]);
	const [mapCenter, setMapCenter] = useState([42.546245, 23.424076]);
	const [mapZoom, setMapZoom] = useState(3);
	console.log('countryInfo===',countryInfo);

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
					console.log('data====',data);
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
				setMapZoom(4);

				// setMapCenter({ lat: latValue, lng: lngValue });
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
			});
	};


	return (
		<div className='app'>
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
			<div className='data'>
				<div className='data_left'>
					<Card
						className='card'
						style={{ backgroundColor: 'black', color: 'white' }}
					>
						<CardContent className='card_content'>
							<h3>Lives Cases by Country</h3>
							<Table tableData={tableData} />
						</CardContent>
					</Card>
					<h3>WordleWide new cases</h3>
					<LineGraph casesType={casesType} />
				</div>
				<div className='data_right'>
					<div className='app__stats'>
						<InfoBox
							onClick={(e) => setCasesType('cases')}
							title='Coronavirus Cases'
							cases={prettyPrintStat(countryInfo.todayCases)}
							total={prettyPrintStat(countryInfo.cases)}
							active={casesType === 'cases'}
							isRed
						/>
						<InfoBox
							onClick={(e) => setCasesType('recovered')}
							title='Recovered'
							active={casesType === 'recovered'}
							cases={prettyPrintStat(countryInfo.todayRecovered)}
							total={prettyPrintStat(countryInfo.recovered)}
						/>
						<InfoBox
							onClick={(e) => setCasesType('deaths')}
							title='Deaths'
							active={casesType === 'deaths'}
							cases={prettyPrintStat(countryInfo.todayDeaths)}
							total={prettyPrintStat(countryInfo.deaths)}
							isRed
						/>
					</div>
					<div className='right_graph'>
						{/* <h3>WordleWid new cases</h3>
						<LineGraph /> */}
						<Map
							countries={mapCountries}
							casesType={casesType}
							mapCenter={mapCenter}
							zoom={mapZoom}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
