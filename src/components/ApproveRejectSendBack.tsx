import axiosInstance from '@/lib/axios';
import { Button } from './ui/button';
import React, { useEffect } from 'react';
import { useSession } from '@/providers/context/SessionContext';
import { useModal } from '@/hooks/use-model-store';
interface Props{
    id:string;
    role: "mentor" | "hod" | "internshipcoordinator" | "tapcell" | "principal"
    change: ()=>void
}

const ApproveRejectSendBack = ({id,role, change}:Props) => {
  const {token, isTokenExpired} = useSession();
  const {onOpen, isOpen, type} = useModal();
  useEffect(() => {
    if (isOpen==false)
    change()
  }, [type, isOpen]);
  const handleApprove = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    try{
      if(isTokenExpired()) return
      await axiosInstance.post(`http://localhost:5000/internship/api/v1/internships/approval/${role}/${id}`,{}, {
        headers:{
          Authorization: "Bearer "+token
        }
      })
      change()
      // console.log(response);

    }catch(error){
      console.error(error)
    }
  }
  const handleReject = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()

    onOpen("rejectInternship", {role:role, id:id});
  
    
  }
  const handleSendBack = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    onOpen("sendbackInternship", {role:role, id:id});

  }
  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-3'>
      <Button variant='primary' onClick={handleApprove} type="button">Approve</Button>
      <Button variant="destructive" onClick={handleReject} type="button">Reject</Button>
      <Button variant="secondary" onClick={handleSendBack} type="button">Send back</Button>
    </div>
  )
}

export default ApproveRejectSendBack