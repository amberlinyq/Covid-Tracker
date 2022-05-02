import React from 'react';
import numeral from 'numeral';

const Table = ({ tableData }) => {
	return (
		<div className='table'>
			<table>
				<tbody>
					{tableData.map(({ country, cases }) => (
						<tr key={country}>
							<td>{country}</td>
							<td>
								<strong>{numeral(cases).format('0,0')}</strong>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
