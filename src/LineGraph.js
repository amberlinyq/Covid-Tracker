import React, { useState, useEffect } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function LineGraph({ casesType }) {
	const [data, setData] = useState({});
	const buildChartData = (data) => {
		let chartData = [];
		let lastDataPoint;
		console.log('data in function===', data);
		for (let date in data.cases) {
			if (lastDataPoint) {
				let newDataPoint = {
					x: date,
					y: data[casesType][date] - lastDataPoint,
				};

				chartData.push(newDataPoint);
			}

			lastDataPoint = data[casesType][date];
		}

		return chartData;
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log('data===',data);
					let chartData = buildChartData(data, casesType);
					setData(chartData);

					// buildChart(chartData);
				});
		};

		fetchData();
	}, [casesType]);
	return (
		<div className='lineGraph'>
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								fill: true,
								backgroundColor: 'rgba(75,192,192,0.2)',
								borderColor: 'rgba(75,192,192,1)',
								data: data,
							},
						],
					}}
					options={options}
				/>
			)}
		</div>
	);
}

export default LineGraph;
