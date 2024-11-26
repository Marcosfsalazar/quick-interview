import Link from 'next/link';
import { JobDescriptionProps } from '@/types';

interface JobItemProps {
  fileName: string;
  jobData: JobDescriptionProps;
}

const JobItem = ({ fileName, jobData }: JobItemProps) => {
  return (
    <Link
      href={`/interview/${fileName.replace('.json', '')}`}
      className="test-item"
    >
      <div className="p-4 cursor-pointer hover:bg-appGreen">
        <h2 className="text-lg font-semibold">{jobData.role}</h2>
        <p className="text-sm">{jobData.company}</p>
      </div>
    </Link>
  );
};

export default JobItem;
