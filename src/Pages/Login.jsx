import React from 'react'
import RegistrationImage from '../Images/RegistrationImages/RegistrationImage'
import InputFieldReg from '../Components/InputFieldReg'
import Button from '../Components/Button'

const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='wrapper flex justify-between items-center gap-[300px]'>
                <div className='registrationBox flex flex-col gap-[55px] justify-between items-start'>
                    <div className='registerHeading'>
                        <h1 className='font-nunito font-bold text-[34.4px] text-[#11175D] mb-[30px]'>
                            Login to your account!
                        </h1>
                        <div className='py-[22px] w-[220px] border flex gap-[10px] justify-center items-center rounded-[9px] googleDiv'>
                            <img src="./src/Images/RegistrationImages/google.png" alt="google" />
                            <span className='font-open text-[13.3px] text-[#03014C] font-semibold googleSpan'>Login with Google</span>
                        </div>
                    </div>
                    <InputFieldReg title={"Email Address"} type={"text"} loginClass={"login"}></InputFieldReg>
                    <InputFieldReg title={"Password"} type={"password"} loginClass={"login"}></InputFieldReg>
                    <Button title={"Login to Continue"} px={"px-[135px]"} py={"py-[20px]"} bRadius={"rounded-[8px]"}></Button>
                    <div className='font-open text-[13.3px] text-[#03014C] font-normal'>
                        Already  have an account ? <span className='font-bold text-[#EA6C00]'><a href="#">Sign In</a></span>
                    </div>
                </div>
                <div className='registrationImage h-screen flex justify-center items-center'>
                    <RegistrationImage></RegistrationImage>
                </div>
            </div>
        </div>
    )
}

export default Login