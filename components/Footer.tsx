import { HeartIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="p-4 w-full flex justify-center relative -bottom-[2rem] border-t-2">
      <h6 className="text-center text-primary dark:text-primary italic">Made with <HeartIcon size={16} color='red' className='inline' /> for the community by Lenugo</h6>
    </footer>
  )
}