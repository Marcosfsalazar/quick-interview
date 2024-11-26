'use client';

import Link from 'next/link';
import { JobDescriptionProps } from '@/types';
import { useModal } from '@/hooks/useModal';
import JobDescription from '../JobDescription/JobDescription';

interface JobItemProps {
  fileName: string;
  jobData: JobDescriptionProps;
}

const JobItem = ({ fileName, jobData }: JobItemProps) => {
  const { openModal } = useModal();
  const handleOpenModal = () => {
    openModal(<JobDescription jobData={jobData} />);
  };
  return (
    <div className="test-item cursor-pointer flex justify-between">
      <Link
        href={`/interview/${fileName.replace('.json', '')}`}
        className="w-10/12 h-full"
      >
        <div className="hover:bg-appGreen p-4 hover:text-appPurple w-full h-full">
          <h2 className="text-lg font-semibold">{jobData.role} →</h2>
          <p className="text-sm">{jobData.company}</p>
        </div>
      </Link>
      <button
        className="w-2/12 border-l hover:border-appPurple font-thin hover:bg-appAquamarine hover:text-appPurple info-border"
        onClick={handleOpenModal}
      >
        info
      </button>
    </div>
  );
};

export default JobItem;
