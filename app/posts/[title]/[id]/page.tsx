export default function Page({ params }: { params: { id: string } }) {
  

  console.log("id: ", params.id);

  return (
    <div className="flex min-h-screen flex-col">
      <h1>Page</h1>
    </div>
  );
}
