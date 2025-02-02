import { FileWarningIcon } from 'lucide-react'

export default function ErrorView({ message }: { message: string }) {
  return (
    <div className="px-4 flex flex-col items-center justify-center min-h-full bg-red-100 text-red-700 rounded-md py-12">
      <h1 className="text-2xl font-bold mb-4">An Error Occurred</h1>
      <FileWarningIcon className="w-12 h-12 mb-4" />
      <h3 className="text-lg">{message}</h3>
    </div>
  )
}