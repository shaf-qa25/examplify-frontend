import React, { useState } from 'react'
import Turnstile from 'react-turnstile'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoginSearchView } from './redux/Slices/loginSlice'
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const schemas = {
  SignUp: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email().regex(/@akgec\.ac\.in$/, 'Must be an @akgec.ac.in email'),
    studentno: z.string().regex(/^\d+$/, 'Student No must be numeric'),
    branch: z.string().min(2),
    section: z.string().min(1),
    password: z.string().min(6),
    year: z.coerce.number().min(1).max(5),
  }),
  SignIn: z.object({
    email: z.string().email().regex(/@akgec\.ac\.in$/, 'Must be an @akgec.ac.in email'),
    password: z.string().min(6),
  }),
};

const Login = () => {
  const [token, setToken] = useState(null);
  const currentPage = useSelector(state => state.login.showAuthPage);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [padding, setPaddingTop] = useState(false);

  const checksubmit = async (data) => {
    console.log(data)

  }


  const selectedSchema = useMemo(() => schemas[currentPage], [currentPage]);

  const defaultValues = useMemo(() => (
    currentPage === 'SignUp'
      ? { name: '', email: '', studentno: '', branch: '', section: '', password: '', year: '' }
      : { email: '', password: '' }
  ), [currentPage]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(selectedSchema),
    defaultValues,
    mode: 'onSubmit',
    key: currentPage
  });



  useEffect(() => {
    reset(defaultValues);
    setToken(null);
  }, [currentPage, reset, defaultValues]);

  // const onSubmit = async (data) => {

  //   const payload = currentPage === 'SignIn'
  //     ? { email: data.email, password: data.password }
  //     : { ...data };

  //     const endpoint = currentPage === 'SignIn'
  //       ? 'https://examplify-backend-2026.vercel.app/v1/api/login'
  //       : 'https://examplify-backend-2026.vercel.app/v1/api/register';

  //     try {
  //       const res = await fetch(endpoint, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(payload)
  //       });

  //       const result = await res.json();
  //       if (!res.ok) throw new Error(result.message);

  //       console.log(`${currentPage} Success:`, result);
  //       navigate('/dashboard');
  //     } catch (err) {
  //       console.error(`${currentPage} Error:`, err.message);
  //     }
  //   };

    const onSubmit = async (data) => {
      const endpoint = currentPage === 'SignIn'
        ? 'https://examplify-backend-2026.vercel.app/v1/api/login'
        : 'https://examplify-backend-2026.vercel.app/v1/api/register';


      const payload = currentPage === 'SignIn'
        ? { email: data.email, password: data.password }
        : {
          ...data,
          studentno: Number(data.studentno)
        };

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        // JSON response handling
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await res.json();
          if (!res.ok) throw new Error(result.message || "Something went wrong");

          console.log(`${currentPage} Success:`, result);
          navigate('/dashboard');
        } else {
          // html response handling
          const text = await res.text();
          console.error("Backend returned non-JSON response:", text);
          throw new Error("Server error: Received HTML instead of JSON");
        }
      } catch (err) {
        console.error(`${currentPage} Error:`, err.message);
        alert(err.message); 
      }
    };

    const handleLoginToggle = () => {
      dispatch(toggleLoginSearchView(currentPage === 'SignUp' ? 'SignIn' : 'SignUp'));
    };


    return (


      <div className='grid grid-flow-col h-screen w-screen overflow-x-hidden overflow-y-hidden' style={{
        background: 'linear-gradient(to bottom, #0A4A9D 15%, #2293F8 80%)',
      }}>
        <div className=' col-span-5 flex justify-center ml-[77px] pl-9'>
          <div className='flex flex-col self-center items-center gap-y-5 '>
            <motion.div
              className='flex flex-col self-center items-center gap-y-5'
              initial={{ x: -200, y: -500, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
            >
              <h1 className='text-white font-bold text-4xl pl-8 '>Welcome to</h1>
              <div className='pl-6 flex justify-center items-center'>
                <img src="https://ucarecdn.com/cda17791-dff9-45c8-b43f-6e81558d6e76/" alt="" className='w-[95px] h-[90px] absolute' />
                <img src="https://ucarecdn.com/d8fc89db-ad53-41ea-8949-8dc0bdd04066/" alt="" className='h-[150px] w-[150px] self-center' />
              </div>
              <h1 className='text-white font-bold text-3xl pl-7 font-exo '>Examplify</h1>
            </motion.div>
          </div>
        </div>
        <div className='col-start-6 col-span-7 overflow-y-auto overflow-x-hidden no-scrollbar '>

          <motion.div
            className='w-[74vw]'
            initial={{ x: "60vw" }} // Start completely off-screen to the right
            animate={{ x: "2vw" }}       // Slide to original position
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0, // no delay
            }}
          >
            <img
              src="https://ucarecdn.com/6f00a23a-3057-4901-a1c1-636bfe85a6dc/-/preview/1000x998/"
              alt="cloud image"
              className="min-h-screen w-full absolute"
            />
            <div className='flex flex-col justify-center items-center ml-10 gap-y-5 ' style={{ paddingTop: padding && currentPage === 'SignUp' ? "1rem" : "6rem" }}

            >

              <div className='z-10 pl-28'>
                {currentPage === 'SignUp' && (
                  <>
                    <h1 className=' tracking-wide  text-black font-sans text-4xl pl-28 font-semibold'>Create your Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className=' self-center w-full tracking-wide overflow-y-scroll no-scrollbar'>
                      <div className='flex flex-col gap-y-6 '>
                        <div className="mt-10 justify-items-start w-full">
                          <label htmlFor="" className="block text-black font-sans font-semibold text-lg">Name</label>
                          <input
                            placeholder="Enter your full name"
                            {...register('name')}
                            className="block w-full min-w-xl text-black border-b border-blue-500 outline-none bg-transparent placeholder-[rgba(0,0,0,0.7)]"
                          />
                          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="justify-items-start w-full">
                          <label htmlFor="" className="block text-black font-sans font-semibold text-lg">Email</label>
                          <input
                            placeholder="Enter your college e-mail ID"
                            {...register('email')}
                            className="block w-full min-w-xl text-black border-b border-blue-500 focus:border-blue-500 focus:outline-none bg-transparent placeholder-[rgba(0,0,0,0.7)]"
                          />
                          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="justify-items-start w-full">
                          <label htmlFor="" className="block text-black font-sans font-semibold text-lg">Student No</label>
                          <input
                            placeholder="Enter your Student number"
                            type="number"
                            {...register('studentno')}
                            className="block w-full min-w-xl text-black border-b border-blue-500 focus:border-blue-500 focus:outline-none bg-transparent placeholder-[rgba(0,0,0,0.7)]"
                          />
                          {errors.studentno && <span className="text-red-500 text-sm">{errors.studentno.message}</span>}
                        </div>

                        <div className="flex gap-x-4 w-full">
                          <div className="justify-items-start w-[70%]">
                            <label htmlFor="" className="block text-black font-sans font-semibold text-lg">Branch</label>
                            <select
                              {...register('branch')}
                              className={`block w-full border-b border-blue-500 focus:outline-none bg-transparent ${watch('branch') === '' ? 'text-[rgba(0,0,0,0.7)]' : 'text-black'
                                }`}
                            >
                              <option value="">Select your branch</option>
                              {[
                                "CSE", "CS", "CS-IT", "CSE-DS", "CSE-HINDI", "IT",
                                "CSE-AIML", "AIML", "ECE", "ME", "EN", "CIVIL"
                              ].map((branch) => (
                                <option key={branch} value={branch}>
                                  {branch}
                                </option>
                              ))}
                            </select>
                            {errors.branch && <span className="text-red-500 text-sm">{errors.branch.message}</span>}
                          </div>

                          <div className="justify-items-start w-[70%] ml-10">
                            <label htmlFor="" className="block text-black font-sans font-semibold text-lg">Section</label>
                            <select
                              {...register('section')}
                              className={`block w-full border-b border-blue-500 focus:outline-none bg-transparent ${watch('section') === '' ? 'text-[rgba(0,0,0,0.7)]' : 'text-black'
                                }`}
                            >
                              <option value="">Select your section</option>
                              {["1", "2", "3", "4"].map((section) => (
                                <option key={section} value={section}>
                                  {section}
                                </option>
                              ))}
                            </select>
                            {errors.section && <span className="text-red-500 text-sm">{errors.section.message}</span>}
                          </div>
                        </div>

                        <div className="justify-items-start w-full mt-4">
                          <label className="block text-black font-sans font-semibold text-lg">Year</label>
                          <select
                            {...register('year')}
                            className={`block w-full border-b border-blue-500 focus:outline-none bg-transparent ${watch('year') === '' ? 'text-[rgba(0,0,0,0.7)]' : 'text-black'
                              }`}
                          >
                            <option value="">Select your year</option>
                            {["1", "2", "3", "4"].map((year) => (
                              <option key={year} value={year}>
                                {year} Year
                              </option>
                            ))}
                          </select>
                          {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
                        </div>

                        <div className="justify-items-start w-full">
                          <label htmlFor="" className="block text-black font-sans font-semibold text-lg">Password</label>
                          <div className="flex justify-between">
                            <input
                              placeholder="Create a password"
                              type={showPassword ? "text" : "password"}
                              {...register('password')}
                              className="block w-full min-w-xl text-black border-b border-blue-500 focus:outline-none bg-transparent placeholder-[rgba(0,0,0,0.7)]"
                            />
                            <span className="ml-[-15px]" onClick={() => setShowPassword((prev) => !prev)}>
                              {showPassword ? (
                                <FaEye className="text-xl text-blue-500" />
                              ) : (
                                <FaEyeSlash className="text-xl text-blue-500" />
                              )}
                            </span>
                          </div>
                          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        {/* <div className="flex justify-center my-4 scale-90">
                        <Turnstile
                          sitekey="0x4AAAAAACG7Mc88FjKC0s4h" 
                          onVerify={(token) => setToken(token)}
                        />
                      </div> */}

                        <div className="flex justify-center pt-1">
                          <button
                            type="submit"
                            className="w-full text-white py-2 px-6 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            style={{
                              background: 'linear-gradient(to right, #0A4A9D 15%, #2293F8 80%)',
                            }}
                            onClick={() => setPaddingTop(true)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>








                      </div>





                    </form>
                  </>


                )}
                {currentPage === 'SignIn' && (
                  <>
                    <h1 className=' tracking-wide  text-black font-sans text-4xl  font-semibold'>Sign In</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className=' self-center w-full tracking-wide overflow-y-scroll no-scrollbar'>
                      <div className='flex flex-col gap-y-6 '>

                        <div className='space-y-2 mt-10 justify-items-start w-full'>
                          <label htmlFor="" className='block text-black font-sans font-semibold text-lg tracking-wide'>Email</label>
                          <input
                            placeholder="Enter your college e-mail ID"

                            {...register('email')}
                            className='block w-full min-w-xl text-black border-b border-blue-500 focus:border-blue-500 focus:outline-none bg-transparent  placeholder-[rgba(0,0,0,0.7)]'
                          />
                          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>


                        <div className=' space-y-2 justify-items-start w-full'>
                          <label htmlFor="" className='block text-black font-sans font-semibold text-lg tracking-wide'>Password</label>
                          <div className='flex justify-between'>
                            <input
                              placeholder="Create a password"
                              type={showPassword ? "text" : "password"}

                              {...register('password')}
                              className='block w-full min-w-xl text-black border-b border-blue-500  focus:outline-none bg-transparent  placeholder-[rgba(0,0,0,0.7)]'

                            />
                            <span className='ml-[-15px] ' onClick={() => setShowPassword((prev) => !prev)}>
                              {showPassword ? (<div><FaEye className='text-xl text-blue-500' /></div>) : (<div><FaEyeSlash className='text-xl text-blue-500' /> </div>)}
                            </span>
                          </div>
                          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                        <div className='flex gap-x-2'>

                          <input type="checkbox" className='mt-1.5' />
                          <label htmlFor="" className='pt-1 text-[rgba(0,0,0,0.7)]'>Remember me</label>
                        </div>
                        {/* <div className="flex justify-center my-4 scale-90">
                        <Turnstile
                          sitekey="0x4AAAAAACG7Mc88FjKC0s4h"
                          onVerify={(token) => setToken(token)}
                        />
                      </div> */}
                        <div className="flex justify-center pt-8">
                          <button
                            type="submit"
                            className=" w-full text-white py-2 px-6 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            style={{
                              background: 'linear-gradient(to right, #0A4A9D 15%, #2293F8 80%)'
                            }}
                            onClick={() => setPaddingTop(true)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>


                      </div>





                    </form>

                  </>
                )}
                <div className='flex w-full justify-around ' style={{ paddingTop: padding ? "1.5rem" : "3rem", marginTop: currentPage === 'SignIn' ? '3rem' : '0rem' }}>
                  <button className='py-2 pb-3  px-9 text-black rounded-3xl text-center text-lg cursor-pointer border-2 border-blue-500 ' style={{ background: currentPage === 'SignUp' ? 'linear-gradient(to bottom, #0A4A9D 15%, #2293F8 80%)' : '#ffffff', color: currentPage === 'SignUp' ? '#ffffff' : '#000000' }} onClick={() => { dispatch(toggleLoginSearchView('SignUp')) }}>Sign up</button>
                  <button className='py-2 pb-3  px-9 text-white rounded-3xl text-center text-lg cursor-pointer border-2 border-blue-500' style={{ background: currentPage === 'SignIn' ? 'linear-gradient(to bottom, #0A4A9D 15%, #2293F8 80%)' : '#ffffff', color: currentPage === 'SignIn' ? '#ffffff' : '#000000' }} onClick={() => { dispatch(toggleLoginSearchView('SignIn')) }}>Sign In</button>
                </div>
              </div>

            </div>
          </motion.div>


        </div>
      </div>
    )
  }

  export default Login