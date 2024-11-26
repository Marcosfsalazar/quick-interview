import { JobDescriptionProps } from '@/types/JobDescriptionProps';
import fs from 'fs';
import path from 'path';

interface LoadJobDataProps {
  fileName: string;
}

export function getJobFiles(): string[] {
  const dataDirectory = path.join(process.cwd(), 'data/positions');
  return fs.readdirSync(dataDirectory);
}

export const loadJobData = ({ fileName }: LoadJobDataProps) => {
  const filePath = path.join(
    process.cwd(),
    `./data/positions/${fileName}.json`,
  );
  let jobDescription: JobDescriptionProps;

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    jobDescription = JSON.parse(fileContents);
    return jobDescription;
  } catch (err) {
    console.error('Error loading interview data:', err);
    return null;
  }
};
