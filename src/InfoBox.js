import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const InfoBox = ({ title, cases, total, ...props }) => {
	return (
		<Card
			onClick={props.onClick}
			className='infoBox'
			// style={{ backgroundColor: 'black', color: 'white', textAlign:'center' }}
		>
			<CardContent>
				<Typography
					className='infoBox_title'
					// style={{ color: 'white', fontWeight: 'bold', fontSize:'18px' }}
				>
					{title} 
				</Typography>
				<h2 className='infoBox__cases'>{cases} Today</h2>
				<Typography className='infoBox__total'>{total} Total</Typography>
			</CardContent>
		</Card>
	);
};

export default InfoBox;
