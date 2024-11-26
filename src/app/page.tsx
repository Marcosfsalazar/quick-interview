import JobItem from '@/components/JobItem/JobItem';
import { JobDescriptionProps } from '@/types';
import { getJobFiles, loadJobData } from '@/utils/loadJobData';
import Image from 'next/image';

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start lg:items-center lg:justifyCenter">
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-appLightGreen"
          href="https://www.linkedin.com/in/marcosfernandessalazar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          My Linkedin →
        </a>
      </footer>
    </div>
  );
}
