import React from 'react'
import InputFieldReg from '../Components/InputFieldReg'
import Button from '../Components/Button'
import RegistrationImage from '../Images/RegistrationImages/RegistrationImage'
import ChattingImage from '../Images/RegistrationImages/ChattingImage'

const Registration = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='wrapper flex justify-between items-center gap-[300px]'>
                <div className='registrationBox flex flex-col gap-[55px] justify-between items-start'>
                    <div className='registerHeading'>
                        <h1 className='font-nunito font-bold text-[34.4px] text-[#11175D] mb-[13px]'>
                            Get started with easily register
                        </h1>
                        <p className='font-nunito font-normal text-[20.64px] text-[#d7d7d7]'>
                            Free register and you can enjoy it
                        </p>
                    </div>
                    <InputFieldReg title={"Email Address"} type={"text"} loginClass={"inputField"}></InputFieldReg>
                    <InputFieldReg title={"Full Name"} type={"text"} loginClass={"inputField"}></InputFieldReg>
                    <InputFieldReg title={"Password"} type={"password"} loginClass={"inputField"}></InputFieldReg>
                    <Button title={"Sign Up"} px={"px-[135px]"} py={"py-[20px]"} bRadius={"rounded-[86px]"}></Button>
                    <div className='font-open text-[13.3px] text-[#03014C] font-normal ml-[55px]'>
                        Already  have an account ? <span className='font-bold text-[#EA6C00]'><a href="#">Sign In</a></span>
                    </div>
                </div>
                <div className='registrationImage h-screen flex justify-center items-center'>
                    <ChattingImage></ChattingImage>
                </div>
            </div>
        </div>
    )
}

export default Registration