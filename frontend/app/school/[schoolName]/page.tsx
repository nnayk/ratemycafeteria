export default async function SchoolPage({ params }: { params: { schoolName: string } }) {
  const { schoolName } = await params;

  return (
    <div>
      <h1>{decodeURIComponent(schoolName)}</h1>
      {/* Add more details about the school here */}
    </div>
  );
}
