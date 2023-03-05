import Toast from '@/components/Toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Number = () => {
	const router = useRouter()
	const [number, setNumber] = useState('')
	const [otpSent, setOtpSent] = useState(false)
	const [otp, setOtp] = useState(5555)
	const [reqid, setReqid] = useState(
		'919' +
			Math.floor(Math.random() * 10000000000)
				.toString()
				.padStart(10, '0')
	)
	const [toast, setToast] = useState({
		show: false,
		message: '',
		type: '',
	})

	const submitHandler = async (e) => {
		e.preventDefault()
		if (!otpSent) {
			if (!number)
				return setToast({
					show: true,
					message: 'Please enter a valid number',
					type: 'error',
				})
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/request_otp/`,
				{
					phone: number,
					request_id: reqid,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			)
			setOtpSent(true)
			console.log(res.data)
			if (res.data.route === 'signup') {
				//if number is not in db then re-route to signup page
				// router.push('/signup')
			}
		} else {
			if (!otp)
				return setToast({
					show: true,
					message: 'Please enter a valid OTP',
					type: 'error',
				})
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/login_verify/`,
				{
					request_id: reqid,
					code: otp,
					phone: number,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!res.data) {
				return setToast({
					show: true,
					message: 'No response from server. Try again later.',
					type: 'error',
				})
			}

			// This toast is not working properly -----------------
			if (res.data && res.data.message === 'Incorrect otp') {
				return setToast({
					show: true,
					message: 'Incorrect OTP entered. Try again.',
					type: 'warning',
				})
			}
			if (
				res.data &&
				res.data.user &&
				res.data.user.user_type === 'NGO'
			) {
				const access_token = res.data.access
				const refresh_token = res.data.refresh
				const user_data = res.data.user
				localStorage.setItem('access_token', access_token)
				localStorage.setItem('refresh_token', refresh_token)
				localStorage.setItem('user_data', JSON.stringify(user_data))
				router.push('/ngo')
			}
			if (
				(res.data && res.data.user_data === 'Business') ||
				res.data.user_data === 'Individual'
			) {
				console.log(res.data)
				router.push('/provider')
			}
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 py-12 px-6 relative'>
			{toast.show && (
				<div className='absolute z-[100] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
					<Toast
						type={toast.type}
						message={toast.message}
						setToast={setToast}
					/>
				</div>
			)}
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
							placeholder='Enter OTP'
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
