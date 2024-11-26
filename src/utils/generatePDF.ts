import jsPDF from 'jspdf';

import { EvaluationData } from '@/types';
import { JobDescriptionProps } from '@/types';

export const generatePDF = (
  jobData: JobDescriptionProps,
  evaluationData: EvaluationData,
) => {
  const doc = new jsPDF();
  console.log('here', evaluationData);
  const margin = 15;
  let y = margin;

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
  doc.text(splitGeneralReport, margin, y);
  y += splitGeneralReport.length * 7 + 5;

  evaluationData.questions.forEach((q, index) => {
    if (y > 270) {
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(14);
    doc.text(`Pergunta ${index + 1}`, margin, y);
    y += 7;

    doc.setFontSize(12);
    const splitQuestion = doc.splitTextToSize(q.question, 180);
    doc.text(splitQuestion, margin, y);
    y += splitQuestion.length * 7;

    doc.text(`Resposta: ${q.response}`, margin, y);
    y += 7;

    doc.text(`Feedback: ${q.user_feedback}`, margin, y);
    y += 10;
  });

  if (evaluationData.general_report) {
    doc.setFontSize(14);
    doc.text('Avaliação Final', margin, y);
    y += 7;

    doc.setFontSize(12);
    const splitFinalReport = doc.splitTextToSize(
      evaluationData.general_report,
      180,
    );
    doc.text(splitFinalReport, margin, y);
    y += splitFinalReport.length * 7 + 5;
  }

  doc.save('Avaliação_Entrevista.pdf');
};
