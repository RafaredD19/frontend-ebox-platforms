import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportVehicleReportPDF(data) {
  const doc = new jsPDF();
  const columns = [
    { header: 'CONDUCTOR', dataKey: 'name' },
    { header: 'TIPO DE LICENCIA', dataKey: 'typeLicense' },
    { header: 'PUNTOS DE LICENCIA', dataKey: 'pointsLicense' },
    { header: 'FECHA DE VENCIMIENTO', dataKey: 'expirationDate' },
    { header: 'CEDULA', dataKey: 'identification' },

  ];

  // Convert headers to array of text values
  const headers = columns.map(column => column.header);

  // Map data to array of arrays of text values
  const rows = data.map(master => [
    master.name,
    master.typeLicense,
    master.pointsLicense,
    master.expirationDate,
    master.identification,
   
  ]);

  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 10,
    theme: 'striped',
  });

  doc.save('reporte_conductores.pdf');
}
