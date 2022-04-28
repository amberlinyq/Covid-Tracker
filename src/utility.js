export const sortData = (data) => {
	let sortedData = [...data];
	sortedData.sort((a, b) => b.cases - a.cases);
	return sortedData;
};
