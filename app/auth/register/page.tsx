"use client"
import { auth } from '@/firebase/setup';
import { promises } from 'dns';
import { RecaptchaVerifier, signInWithPhoneNumber , ConfirmationResult } from 'firebase/auth';
import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import PhoneInput from 'react-phone-input-2';


export default function Register() {

   const[otp , setOtp] = useState(''); 
   const[phone , setPhone] = useState('')
   const[user , setUser] = useState<ConfirmationResult | null>(null)

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
        
    } catch (err) {
        console.log(err);
    }
        
   }

  return (
    <div className='flex justify-center'>
        <div className="flex flex-col gap-5">
            App
            <div>
                <PhoneInput
                country={'in'}
                value={phone}
                onChange={phone=>setPhone('+'+phone)}

                />
            </div>
            <button onClick={sendOtp} className='bg-red-200 rounded p-4'>send otp</button>
            <div id='recaptchaVerifier'></div>
            <div className=''>
                <label>Enter OTP</label>
                <OtpInput 
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    renderSeparator={<span className='px-1'></span>}
                    inputStyle={'text-lg border-2 rounded border-blue-800 '} 
                    
                />

            </div>
            <div><button onClick={verifyUser} className='py-1 px-10 bg-blue-300 rounded'>Submit</button></div>
        </div>
    </div>
  )
}
