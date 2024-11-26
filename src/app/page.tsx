import JobItem from '@/components/JobItem/JobItem';
import { JobDescriptionProps } from '@/types';
import { getJobFiles, loadJobData } from '@/utils/loadJobData';

export default function Home() {
  const jobFiles = getJobFiles();
  const jobs = jobFiles
    .map((fileName) => {
      const jobData = loadJobData({ fileName: fileName.replace('.json', '') });
      return jobData ? { fileName, jobData } : null;
    })
    .filter((job) => job !== null) as {
    fileName: string;
    jobData: JobDescriptionProps;
  }[];

  return (
    <div className="flex flex-col items-center gap-8 min-h-screen">
      <main className="flex flex-grow flex-col gap-8 items-center justify-center">
        <h1 className="font-bold text-appLightGreen text-4xl">
          QUICK_INTERVIEW_
        </h1>
        <p className="text-appLightGreen">
          Selecione uma entrevista para simular
        </p>
        <div className="flex gap-4 items-center flex-col w-full">
          {jobs.map(({ fileName, jobData }) => (
            <JobItem key={fileName} fileName={fileName} jobData={jobData} />
          ))}
        </div>
      </main>
      <footer className="justify-self-end flex gap-6 flex-wrap items-end justify-center">
        <div className="flex items-center justify-center flex-col">
          <div className="text-appLightGreen italic text-sm">
            by Marcos Salazar
          </div>
          <a
            className="flex items-center text-sm gap-2 mb-4 hover:underline hover:underline-offset-4 text-appLightGreen"
            href="https://www.linkedin.com/in/marcosfernandessalazar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin →
          </a>
        </div>
      </footer>
    </div>
  );
}
