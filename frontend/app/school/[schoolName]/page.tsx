// app/school/[schoolName]/page.tsx

import { useRouter } from 'next/navigation';

export default function SchoolPage({ params }: { params: { schoolName: string } }) {
  return (
    <div>
      <h1>{decodeURIComponent(params.schoolName)}</h1>
      {/* Add more details about the school here */}
    </div>
  );
}

