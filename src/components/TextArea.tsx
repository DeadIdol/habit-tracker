import { useEffect, useRef } from 'react'

interface TextAreaProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  value?:string;
}

export default function TextArea({ onChange, className, value } : TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
      if (ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    }, [value]);

  return (
    <textarea onChange={onChange} className={className} value={value} ref={ref}/>
  )
}