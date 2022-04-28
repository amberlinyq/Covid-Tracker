import React from 'react';
const Table = ({ tableData }) => {
	return (
		<div className='table'>
			<table>
				<tbody>
					{tableData.map(({ country, cases }) => (
						<tr key={country}>
							<td>{country}</td>
							<td>{cases}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
