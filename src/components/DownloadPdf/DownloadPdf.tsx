import { EvaluationData, JobDescriptionProps } from '@/types';
import { generatePDF } from '@/utils/generatePDF';

interface DownloadPdfProps {
  evaluationData: EvaluationData;
  jobData: JobDescriptionProps;
}

const DownloadPdf = ({ jobData, evaluationData }: DownloadPdfProps) => {
  const handleDownloadPDF = (isUser: boolean) => {
    generatePDF(jobData, evaluationData, isUser);
  };

  return (
    <div className="flex flex-col justify-center items-center highlight p-4 gap-4">
      <p className="text-lg">Escolha a versão que deseja baixar:</p>
      <button
        onClick={() => handleDownloadPDF(true)}
        className="bg-appGreen hover:highlight hover:text-appLightGreen text-appPurple p-2 rounded"
      >
        Download User Report
      </button>
      <button
        onClick={() => handleDownloadPDF(false)}
        className="bg-appAquamarine hover:highlight hover:text-appLightGreen p-2 rounded"
      >
        Download Manager Report
      </button>
      <p className="text-xs italic">
        *Poderíamos gerar esse arquivo e enviar a versão de user ao email user e
        a do manager ao email do manager da vaga, esse modal está aqui somente
        para fins demonstrativos.
      </p>
    </div>
  );
};

export default DownloadPdf;
