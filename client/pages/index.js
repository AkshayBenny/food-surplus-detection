import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const inputClass =
	'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent'

export default function Home() {
	const router = useRouter()
	const [type, setType] = useState('business')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const submitHandler = async () => {
		// const res = await axios.post(
		// 	`${NEXT_PUBLIC_API_IP}/api/auth/register`,
		// 	{ email, phone }
		// )
router.push()
	}
	return (
		<div>
			<Head>
				<title>Sign In | Food Surplus Detection</title>
			</Head>
			<div className='flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-red-500 via-purple-500 to-pink-500'>
				<form
					onSubmit={submitHandler}
					className='flex flex-col items-center justify-center gap-4 border-2 px-8 py-4 w-full max-w-xl rounded-md bg-white'>
					<h1 className='font-normal text-center text-2xl text-gray-500 uppercase'>
						Sign Up
					</h1>
					<div className='w-full'>
						<p className='text-xm font-light text-gray-500'>
							Enter Phone number
						</p>
						<input
							value={phone}
							type='text'
							inputMode='numeric'
							placeholder='Enter phone number'
							onChange={(e) => setPhone(e.target.value)}
							className={inputClass}
						/>
					</div>
					<div className='w-full'>
						<p className='text-xm font-light text-gray-500'>
							Enter Email
						</p>
						<input
							type='email'
							value={email}
							placeholder='Enter email address'
							onChange={(e) => setEmail(e.target.value)}
							className={inputClass}
						/>
					</div>
					<button className='mt-6 relative inline-flex items-center justify-center  p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group'>
						<span className='absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease'></span>
						<span className='absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease'>
							<span className='absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md'></span>
							<span className='absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md'></span>
						</span>
						<span className='relative text-white'>Sign-up</span>
					</button>
				</form>
			</div>
		</div>
	)
}
