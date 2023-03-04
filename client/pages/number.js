import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Number = () => {
	const router = useRouter()
	const [number, setNumber] = useState(919876543210)
	const [otpSent, setOtpSent] = useState(false)
	const [otp, setOtp] = useState('')

	const submitHandler = async (e) => {
		e.preventDefault()
		if (!otpSent) {
			if (!number) return alert('Please enter phone number')
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/request-otp/`,
				{
					phone: number,
					request_id:
						919876543210 ||
						'919' +
							Math.floor(Math.random() * 10000000000)
								.toString()
								.padStart(10, '0'),
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			)
			console.log(res)
			// if (res.data) {
			// 	console.log(res.data)
			// 	// router.push('/otp')
			// 	setOtpSent(true)
			// }
		} else {
			if (!otp) return alert('Please enter OTP')
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/login_verify`,
				{
					code: otp,
					phone: number,
					request_id:
						'919' +
						Math.floor(Math.random() * 10000000000)
							.toString()
							.padStart(10, '0'),
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (res.data) {
				console.log(res.data)
				// Reroute to appropriate dashboard
				router.push('/dashboard')
			}
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 py-12 px-6'>
			<form
				onSubmit={submitHandler}
				className='flex flex-col items-center justify-center gap-4 w-full max-w-xl'>
				{otpSent ? (
					<div className='w-full flex flex-col justify-start gap-3'>
						<input
							value={otp}
							type='text'
							inputMode='numeric'
							onChange={(e) => setOtp(e.target.value)}
							placeholder='Enter phone number'
							className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent'
						/>
						<p>Otp send to your mobile number</p>
					</div>
				) : (
					<input
						value={number}
						type='text'
						inputMode='numeric'
						onChange={(e) => setNumber(e.target.value)}
						placeholder='Enter phone number'
						className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent'
					/>
				)}
				<button
					type='submit'
					className='mt-6 relative inline-flex items-center justify-center  p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group border border-white'>
					<span className='absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease'></span>
					<span className='absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease'>
						<span className='absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md'></span>
						<span className='absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md'></span>
					</span>
					<span className='relative text-white'>Submit</span>
				</button>
			</form>
		</div>
	)
}

export default Number
