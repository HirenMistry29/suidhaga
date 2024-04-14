'use client'
import { useNavigate } from "@/hooks/useRoute";


export default function Home() {
  const router = useNavigate();

  return (
    <>
    <div className="text-xl">click here to visit home page<span className="cursor-pointer ml-1" onClick={()=>router('/home')}>HOME</span> </div>
    </>
  );
}
