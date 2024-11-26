import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EvaluationData } from '@/types';
import { JobDescriptionProps } from '@/types';

export const generatePDF = (
  jobData: JobDescriptionProps,
  evaluationData: EvaluationData,
) => {
  const doc = new jsPDF();
  const margin = 15;
  let y = margin;

  const addPageIfNeeded = () => {
    if (y > 270) {
      doc.addPage();
      y = margin;
    }
  };

  const logo = '/icons/logo.png';
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    doc.addImage(img, 'PNG', margin, y, 30, 30);
    y += 35;

    doc.setFontSize(18);
    doc.text('Avaliação da Entrevista', margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Empresa: ${jobData.company}`, margin, y);
    y += 7;
    doc.text(`Cargo: ${jobData.role}`, margin, y);
    y += 7;

    doc.setFontSize(14);
    doc.text('Relatório Geral', margin, y);
    y += 7;

    doc.setFontSize(12);
    const splitGeneralReport = doc.splitTextToSize(
      evaluationData.general_report,
      180,
    );
    splitGeneralReport.forEach((line: string) => {
      addPageIfNeeded();
      doc.text(line, margin, y);
      y += 7;
    });
    y += 5;

    evaluationData.questions.forEach((q, index) => {
      addPageIfNeeded();

      doc.setFontSize(14);
      doc.text(`Pergunta ${index + 1}`, margin, y);
      y += 7;

      doc.setFontSize(12);

      const splitQuestion = doc.splitTextToSize(q.question, 180);
      splitQuestion.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      const splitResponse = doc.splitTextToSize(`Resposta: ${q.response}`, 180);
      splitResponse.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      const splitFeedback = doc.splitTextToSize(
        `Feedback: ${q.user_feedback}`,
        180,
      );
      splitFeedback.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      const splitReport = doc.splitTextToSize(`Report: ${q.report}`, 180);
      splitReport.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      doc.text(`Nota: ${q.rating}/10`, margin, y);
      y += 10;
    });

    const tableColumn = ['Pergunta', 'Nota', 'Report'];
    const tableRows: string[][] = [];

    evaluationData.questions.forEach((q) => {
      tableRows.push([q.question, q.rating.toString(), q.report]);
    });

    addPageIfNeeded();

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: y,
      theme: 'grid',
      styles: { fontSize: 10, overflow: 'linebreak' },
      headStyles: { fillColor: [70, 130, 180] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 20 },
        2: { cellWidth: 80 },
      },
      didDrawPage: (data) => {
        if (data.cursor) {
          y = data.cursor.y + 10;
        } else {
          y += 10;
        }
      },
    });

    const currentDate = new Date();
    doc.setFontSize(10);
    doc.text(
      `Data: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`,
      margin,
      y,
    );

    doc.save(`Avaliação_Entrevista_${jobData.role}.pdf`);
  };

  img.onerror = () => {
    doc.setFontSize(18);
    doc.text('Avaliação da Entrevista', margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Empresa: ${jobData.company}`, margin, y);
    y += 7;
    doc.text(`Cargo: ${jobData.role}`, margin, y);
    y += 7;

    doc.setFontSize(14);
    doc.text('Relatório Geral', margin, y);
    y += 7;

    doc.setFontSize(12);
    const splitGeneralReport = doc.splitTextToSize(
      evaluationData.general_report,
      180,
    );
    splitGeneralReport.forEach((line: string) => {
      addPageIfNeeded();
      doc.text(line, margin, y);
      y += 7;
    });
    y += 5;

    evaluationData.questions.forEach((q, index) => {
      addPageIfNeeded();

      doc.setFontSize(14);
      doc.text(`Pergunta ${index + 1}`, margin, y);
      y += 7;

      doc.setFontSize(12);

      const splitQuestion = doc.splitTextToSize(q.question, 180);
      splitQuestion.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      const splitResponse = doc.splitTextToSize(`Resposta: ${q.response}`, 180);
      splitResponse.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      const splitFeedback = doc.splitTextToSize(
        `Feedback: ${q.user_feedback}`,
        180,
      );
      splitFeedback.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      const splitReport = doc.splitTextToSize(`Report: ${q.report}`, 180);
      splitReport.forEach((line: string) => {
        addPageIfNeeded();
        doc.text(line, margin, y);
        y += 7;
      });

      doc.text(`Nota: ${q.rating}/10`, margin, y);
      y += 10;
    });

    const tableColumn = ['Pergunta', 'Nota', 'Report'];
    const tableRows: string[][] = [];

    evaluationData.questions.forEach((q) => {
      tableRows.push([q.question, q.rating.toString(), q.report]);
    });

    addPageIfNeeded();

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: y,
      theme: 'grid',
      styles: { fontSize: 10, overflow: 'linebreak' },
      headStyles: { fillColor: [70, 130, 180] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 20 },
        2: { cellWidth: 80 },
      },
      didDrawPage: (data) => {
        if (data.cursor) {
          y = data.cursor.y + 10;
        } else {
          y += 10;
        }
      },
    });

    const currentDate = new Date();
    doc.setFontSize(10);
    doc.text(
      `Data: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`,
      margin,
      y,
    );
    doc.save(`Avaliação_Entrevista_${jobData.role}.pdf`);
  };
};
