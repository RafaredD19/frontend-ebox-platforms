import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportVehicleReportPDF(data) {
  const doc = new jsPDF();
  const columns = [
    { header: 'Código', dataKey: 'codeUnit' },
    { header: 'Marca', dataKey: 'brand' },
    { header: 'Color', dataKey: 'color' },
    { header: 'Modelo', dataKey: 'model' },
    { header: 'Tipo Combustible', dataKey: 'typeFuel' },
    { header: 'Tipo Unidad', dataKey: 'typeUnit' },
    { header: 'Comentario', dataKey: 'comment' },
    { header: 'VIN', dataKey: 'vin' },
    { header: 'Año', dataKey: 'year' },
  ];

  // Convert headers to array of text values
  const headers = columns.map(column => column.header);

  // Map data to array of arrays of text values
  const rows = data.map(master => [
    master.codeUnit,
    master.brand,
    master.color,
    master.model,
    master.typeFuel,
    master.typeUnit,
    master.comment,
    master.vin,
    master.year,
  ]);

  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 10,
    theme: 'striped',
  });

  doc.save('reporte_vehiculos.pdf');
}
