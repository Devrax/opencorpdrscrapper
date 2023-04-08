import fs from 'fs';

/**
 * This for the DGII entries that are in TXT, but in order for to be loaded into supabase,
 * must be turn into TSV, this list usually must be update each 2 weeks, the last update was 
 * on Friday 7 april 2023
 */
fs.readFile('DGII/DGII_RNC.TXT', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const csv = [
        'RNC\tlegalName\testablishmentDate\tstatus'
    ];
    data.split('\n').forEach(txt => {
        const instanceCSV = [];
        const values = txt.split('|').map(t => t.trim());
        const keys = ['RNC', 'legalName', 'companyName', 'economyActivity', 'category', 'localAdministration', 'null1', 'null2', 'establishmentDate', 'status', 'taxPayment'];

        for(let i = 0; i < keys.length; i++) {
            if(['companyName', 'economyActivity', 'category', 'localAdministration', 'null1', 'null2', 'taxPayment'].includes(keys[i])) {
                continue;
            }
            instanceCSV.push(values[i]?.split(' ').filter(Boolean).join(' ').trim());
        }

        csv.push(instanceCSV.join('\t'));
    });

    fs.writeFile('./DGII/DGII_RNC_formatted.tsv', csv.join('\n'),  (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Data written to file successfully!');
      })
})