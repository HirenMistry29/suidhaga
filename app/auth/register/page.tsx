"use client"
import { auth } from '../../../firebase/setup';
import { RecaptchaVerifier, signInWithPhoneNumber , ConfirmationResult } from 'firebase/auth';
import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'
import { Sansita } from '@next/font/google'
import { useRouter } from 'next/navigation'
import { EyeFilled , EyeInvisibleFilled } from '@ant-design/icons';
import PasswordForm from '@/components/auth/passwordForm';


const SansitaBold = Sansita({
    subsets: ["latin"],
    weight: "700",
    style: ['normal']
})

export default function Register() {

   const[otp , setOtp]          = useState(''); 
   const[phone , setPhone]      = useState('')
   const[user , setUser]        = useState<ConfirmationResult | null>(null)
   const router = useRouter()
   const[ status , setStatus ]  = useState(true)

   const sendOtp = async () => {
    try {
        const recaptchaVerifier = new RecaptchaVerifier(auth,'recaptchaVerifier', {})
        const confirmation = await signInWithPhoneNumber(auth, phone , recaptchaVerifier)
        console.log(confirmation);
        setUser(confirmation) 
    } catch (error) {
        console.log(error);   
    }
   }

   async function verifyUser(){
    try {
        const data = await user?.confirm(otp);
        console.log(data);
        setStatus(true);
        // if(data){
        //     router.push('/home');
        // }
        
    } catch (err) {
        console.log(err);
    }
        
   }

//    console.log(auth.currentUser);
   

  return (
    <div className='relative h-screen bg-[#F1F1F1]' >
        <div className='absolute inset-0'>
            <div id='vector-bg' className='flex justify-end overflow-hidden h-screen'>
                <svg viewBox="0 0 702 1117" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-full'>
                    <path d="M372 0H703.5V1117H302C159 912 113.358 833.88 58 757.5C-21 648.5 -15.0001 598 58 488.5L372 0Z" fill="#3357B7" stroke="#ABCBFF" />
                </svg>    
            </div>
        </div>
          <div id='card' className=' w-screen h-screen'>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:p-[3%] xs:max-sm:py-[8%] xs:max-sm:px-[4%]  shadow-2xl w-[70%] h-[60%]">
                  <span className={`${SansitaBold.className} text-xl md:text-2xl lg:text-3xl  text-[#333333] flex xs:place-content-center sm:place-content-center md:place-content-start`}>Register To Your Account</span>
                  <div className={`${status && 'hidden'}`}>
                  <div className='mt-[4%]'>
                      <PhoneInput
                          country={'in'}
                          value={phone}
                          onChange={phone => setPhone('+' + phone)}
                          disableDropdown	
                      />
                  </div>
                  <div className="w-1/3 flex flex-col justify-center">
                      <div className="flex justify-center">
                          <div id='send_otp_button' className='px-[5%] py-[1%] bg-[#C84869] text-white mt-[2%] rounded-md cursor-pointer' onClick={sendOtp}> Send OTP</div>
                      </div>
                  </div>
                  <div id='recaptchaVerifier' className='mt-[2%]'></div>
                  <div className="w-1/3 mt-[4%]">
                  <div className='flex justify-center items-center'>
                      <label className='px-[3%]'>Enter OTP :</label>
                      <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderInput={(props) => <input {...props} />}
                          renderSeparator={<span className='px-1'></span>}
                          inputStyle={'text-lg border-2 rounded border-gray-400 '}
                      />
                    </div>
                    <div className="">
                      <div className="flex justify-center">
                          <div id='send_otp_button' className='px-[10%] py-[1%] bg-[#C84869] text-white mt-[2%] rounded-md cursor-pointer' onClick={verifyUser}>Verify</div>
                      </div>
                  </div>
                  </div>
                  
              </div>
              <div className={`${!status && 'hidden'} `}>
                    <div className={`${SansitaBold.className} text-md text-[#333333] md:text-xl mt-[2%] w-[100%] flex xs:max-md:place-content-center `}>Create Your Password</div>
                    <div className='mt-[2%] w-full'><PasswordForm/></div>
                    
              </div>
              </div>
          </div>
    </div>
  )
}
