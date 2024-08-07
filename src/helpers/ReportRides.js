import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(rides) {
  const doc = new jsPDF();
  const head = [['Fecha','', 'Unidad', ' ','Ruta', '    ','    ','    ','Horarios']];
  let finalY = 10;

  // Add the header once at the beginning
  doc.autoTable({
    startY: finalY,
    head: head,
    body: [],
    theme: 'striped',
    margin: { top: 10 }
  });

  finalY = doc.lastAutoTable.finalY + 2; // Slightly increase finalY for the new data rows

  rides.forEach(ride => {
    // Create body with schedules
    const body = [
      [ride.date, ride.unit, `${ride.name} - ${ride.description}`, '-----']
    ];
    body.push(['', '', `${ride.name} - ${ride.description}`,  ride.firstSchedule]);
    ride.schedules.slice(1).forEach(schedule => {
    
      body.push(['', '', `${ride.name} - ${ride.description}`, schedule]);
    });

    // Add the body data
    doc.autoTable({
      startY: finalY,
      body: body,
      theme: 'striped',
      margin: { top: 10 },
      didDrawPage: (data) => {
        // Ensure alignment by drawing the header only on new pages
        if (data.pageNumber > 1) {
          doc.autoTable({
            startY: data.settings.margin.top,
            head: head,
            body: [],
            theme: 'striped',
            margin: { top: 10 }
          });
        }
      }
    });

    finalY = doc.lastAutoTable.finalY + 10; // Add space after each group
  });

  doc.save('reporte_rides.pdf');
}
