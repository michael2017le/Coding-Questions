// simple function to format relevant data for entry
function jsonEntry(month, principal, monthlyPayment, intPayment, principalPayment) {
	return {
		"Month":month,
		"Principal":principal.toFixed(2),
		"Monthly Payment":monthlyPayment.toFixed(2),
		"Interest Payment":intPayment.toFixed(2),
		"Principal Payment":principalPayment.toFixed(2),
	};
}

/*
1. John Doe wants to buy a house, and needs to borrow $200,000.
He receives two loan estimates  from his bank,
one for loan of 30 years at the rate of 3%,
one for a loan of 20 years at the rate of  2.5%.

Write a function that will calculate the monthly payment,
generate the amortization table of  the loan
and then calculate how much interest will be paid
over the life of the loan in both scenarios. 
*/
function loanTable(yearInt, principal, numYears, tableName, fileName) {
	let monthInt = yearInt/12;
	let numMonths = numYears * 12;
	const XLSX = require('xlsx');

	let monthlyPayment = monthInt / (1 - (Math.pow(1 + monthInt, -numMonths))) * principal;
	let intPayment = monthInt * principal;
	let principalPayment = monthlyPayment - intPayment;
	let entries = [jsonEntry(1, principal, monthlyPayment, intPayment, principalPayment)];
	for(let i = 2; i <= numMonths; i++) {
		principal -= principalPayment;
		let intPayment = monthInt * principal;
		principalPayment = monthlyPayment - intPayment;
		entries.push(jsonEntry(i, principal, monthlyPayment, intPayment, principalPayment));
	}
	let wb = XLSX.utils.book_new();
	let ws = XLSX.utils.json_to_sheet(entries);
	XLSX.utils.book_append_sheet(wb, ws, tableName);
	XLSX.writeFile(wb, fileName);
}

// Use the two excel files generated to compare loan tables
loanTable(0.03, 200000, 30, "Loan Table", "3% Interest and 30 Years.xlsx");
loanTable(0.025, 200000, 20, "Loan Table", "2.5% Interest and 20 Years.xlsx");
