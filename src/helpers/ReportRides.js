import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(rides) {
  const doc = new jsPDF();
  let finalY = 10;

  rides.forEach(ride => {
    const head = [['Nombre', 'Descripción', 'Unidad', 'Fecha', 'Horarios']];
    const body = [
      [ride.name, ride.description, ride.unit, ride.date, ride.firstSchedule]
    ];
    ride.schedules.slice(1).forEach(schedule => {
      body.push([ride.name, ride.description, ride.unit, ride.date, schedule]);
    });
    doc.autoTable({
      startY: finalY,
      head: head,
      body: body,
      theme: 'striped'
    });
    finalY = doc.lastAutoTable.finalY + 10; // Update finalY for the next table
  });

  doc.save('reporte_rides.pdf');
}
