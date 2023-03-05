import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TbCurrentLocation } from 'react-icons/tb'

const inputClass =
	'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent'

export default function Signup() {
	const router = useRouter()
	const [location, setLocation] = useState({ latitude: 0, longitude: 0 })
	const [error, setError] = useState(null)
	const [type, setType] = useState(2)
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [selectedOption, setSelectedOption] = useState(1)
	const [reqid, setReqid] = useState(
		'919' +
			Math.floor(Math.random() * 10000000000)
				.toString()
				.padStart(10, '0')
	)
	const [otp, setOtp] = useState(5555)
	const [otpSent, setOtpSent] = useState(false)

	const submitHandler = async (e) => {
		e.preventDefault()
		if (!otpSent) {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/request_otp/`,
				{
					phone: phone,
					request_id: reqid,
					email: email,
					name: name,
					user_type: selectedOption,
				}
			)
			if (res.data.status === 'Success') {
				setOtpSent(true)
			}
			console.log(res)
			if (res.data.route === 'signup') {
				localStorage.setItem('user_number', phone)
				// router.push('/number')
				// if (type === 1 || type === 2) {
				// 	router.push('/provider')
				// }
				// if (type === 3) {
				// 	router.push('/ngo')
				// }
			} else {
				console.log('Not redirected', res.data)
			}
		} else {
			if (!otp)
				return setToast({
					show: true,
					message: 'Please enter a valid OTP',
					type: 'error',
				})
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/signup_verify/`,
				{
					request_id: reqid,
					code: otp,
					phone: phone,
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
			if (res.data && res.data.status === 'success') {
				if (selectedOption === 1 || selectedOption === 2) {
					router.push('/provider')
				}
				if (selectedOption === 3) {
					router.push('/ngo')
				}
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

	if (error) window.alert(error)

	const getCurrentLocation = (e) => {
		e.preventDefault()
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) =>
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					}),
				(error) => setError(error.message)
			)
		} else {
			setError('Geolocation is not supported by this browser.')
		}
	}

	const handleOptionChange = (event) => {
		console.log(event.target.value)
		setSelectedOption(event.target.value)
	}

	return (
		<div className=''>
			<Head>
				<title>Sign In | Food Surplus Detection</title>
			</Head>
			<div className='flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 py-12'>
				<form
					onSubmit={submitHandler}
					className='flex flex-col items-center justify-center gap-4 border-2 px-8 py-4 w-full max-w-xl rounded-md bg-white'>
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
						<>
							<h1 className='font-normal text-center text-2xl text-gray-500 uppercase'>
								Sign Up
							</h1>
							<div className='w-full'>
								<p className='text-xm font-light text-gray-500 text-start'>
									Select your type of organization
								</p>
								<div className='flex  space-x-4'>
									<label className='inline-flex items-center'>
										<input
											type='radio'
											value={1}
											checked={selectedOption == 1}
											onChange={handleOptionChange}
											className='form-radio h-5 w-5 text-green-600'
										/>
										<span className='ml-2 text-gray-700 text-sm font-light'>
											Individual
										</span>
									</label>
									<label className='inline-flex items-center'>
										<input
											type='radio'
											value={2}
											checked={selectedOption == 2}
											onChange={handleOptionChange}
											className='form-radio h-5 w-5 text-red-600'
										/>
										<span className='ml-2 text-gray-700 text-sm font-light'>
											Business
										</span>
									</label>
									<label className='inline-flex items-center'>
										<input
											type='radio'
											value={3}
											checked={selectedOption == 3}
											onChange={handleOptionChange}
											className='form-radio h-5 w-5 text-blue-600'
										/>
										<span className='ml-2 text-gray-700 text-sm font-light'>
											NGO
										</span>
									</label>
								</div>
							</div>
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
							<div className='w-full'>
								<p className='text-xm font-light text-gray-500'>
									Enter Name
								</p>
								<input
									type='text'
									value={name}
									placeholder='Enter your name'
									onChange={(e) => setName(e.target.value)}
									className={inputClass}
								/>
							</div>
							<div className='flex flex-col items-center justify-center gap-6'>
								<button
									onClick={getCurrentLocation}
									className='border-2 border-violet-500 px-4 py-2 text-violet-500 rounded-lg hover:bg-violet-500 hover:text-white duration-200 flex items-center justify-center gap-3'>
									<TbCurrentLocation size='16px' />
									<p>Get current location</p>
								</button>
								<iframe
									className='rounded-lg'
									src={`https://embed.waze.com/iframe?zoom=12&lat=${location.latitude}&lon=${location.longitude}&pin=1&desc=My%20Location}`}
									width='500'
									height='400'></iframe>
							</div>
						</>
					)}

					<button
						type='submit'
						className='mt-6 relative inline-flex items-center justify-center  p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group'>
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
