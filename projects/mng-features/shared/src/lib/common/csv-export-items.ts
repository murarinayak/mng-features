import { M2NCSV } from './m2n-csv';
import { formatDate } from './utils';

export class CSVExportItems {
    static generate(data, groupName = '') {
        // console.log('Build the csv', data);
        let csv = '';
        const title = 'expense_report';
        let total = 0;

        // csv += M2NCSV.makeCSVLine([groupName]); // GroupName not available to fetch as of now
        // csv += M2NCSV.makeCSVLine([' ']);
        csv += M2NCSV.makeCSVLine(['Date', 'Name', 'Price']);
        data.forEach(item => {
            const formattedDate = ' ' + formatDate(item.transactionDateTime);
            csv += M2NCSV.makeCSVLine([formattedDate, item.name, item.price]);
            total += item.price;
        });
        csv += M2NCSV.makeCSVLine([' ']);
        csv += M2NCSV.makeCSVLine(['', 'Total:', total]);

        M2NCSV.export(csv, title);
    }
}
