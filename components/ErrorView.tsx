export default function ErrorView({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-red-100 text-red-700 rounded-md py-12">
      <h1 className="text-2xl font-bold mb-4">An Error Occurred</h1>
      <h3 className="text-lg">{message}</h3>
    </div>
  )
}