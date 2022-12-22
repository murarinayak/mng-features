// User defined
declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}

export class M2NCSV {

  private static findQuotesRegExp: RegExp = /\\"/g;

  static makeCSVLine(cols, leadingCols = 0) {
    let line = '';
    let value = '';
    let firstItem = true;
    cols.forEach(col => {
      value = '';
      try {
        // To make sure that for any problem, it should not throw an error and halt processing.
        value = (typeof (col) === 'undefined') ? '' : col.toString();
        // Escape (excel style) any double quotes
        value = value.replace(this.findQuotesRegExp, '""');
        // Now double quote the value if it contains quotes or commas
        if (value.search(',') >= 0 || value.search('"') >= 0) {
          value = '"' + value + '"';
        }
      } catch (error) {
        console.log(error);
      }
      line += ((!firstItem) ? ',' : '') + value;

      firstItem = false;
    });
    return line ? (line + '\n') : '';
  }

  static export(csvData, title) {
    // console.log('generate csv');
    const timestamp = new Date();
    let rawFile = '';
    // Build the generic header
    rawFile += 'My Finance,\n';
    // rawFile += 'Confidential,\n';
    rawFile += '\n';

    // And the report header
    // rawFile += '"' + title + '",\n';
    // rawFile += formatDate(timestamp) + ',\n';
    // rawFile += '\n';

    // Add the data they specified
    if (csvData) {
      rawFile += csvData + '\n';
    }

    rawFile += '\n';
    rawFile += 'Copyright ' + timestamp.getFullYear() + ' MurariNayak. \n';
    // rawFile += 'All rights reserved. \n';

    // Save the file...
    const fileName = title + '-' + timestamp.getFullYear() + (timestamp.getMonth() + 1) + timestamp.getDate() + '.csv';
    if (navigator.msSaveBlob) {
      const blob = new Blob([rawFile], { 'type': 'text/csv;charset=utf8;' });
      navigator.msSaveBlob(blob, fileName);
    } else {
      const blob = new Blob([rawFile], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.click();
    }
  }
}
