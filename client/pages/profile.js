import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const inputClass =
	'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent'

const Profile = () => {
	const [user, setUser] = useState('')
	const [name, setName] = useState('')
	const [about, setAbout] = useState('')
	const [address, setAddress] = useState('')
	const [coord, setCoord] = useState({
		lat: '',
		lng: '',
	})

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user_data')).id)
		const getCurrentLocation = (e) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) =>
						setCoord({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						}),
					(error) => setError(error.message)
				)
			} else {
				setError('Geolocation is not supported by this browser.')
			}
		}
		getCurrentLocation()
	}, [])

	const updateProfile = async () => {
		const access_token = localStorage.getItem('access_token')
		// const refresh_token = localStorage.getItem('refresh_token')
		// const user_data = JSON.parse(localStorage.getItem('user_data'))
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/create_profile/`,
			{
				user: user,
				name: name,
				about: about,
				address: address,
				latitude: coord.lat || 0,
				longitude: coord.lng || 0,
			},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		)
		console.log('update profile>>', res)
	}

	return (
		<div className='flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 py-12'>
			<div className='bg-white px-6 py-4 flex flex-col items-center justify-center gap-3 rounded-lg'>
				<div className='w-full'>
					<p className='text-xm font-light text-gray-500'>User Id</p>
					<input
						value={user}
						type='text'
						placeholder='Enter Name'
						onChange={(e) => setName(e.target.value)}
						className={`${inputClass} cursor-not-allowed bg-gray-100`}
					/>
				</div>
				<div className='w-full'>
					<p className='text-xm font-light text-gray-500'>
						Enter Name
					</p>
					<input
						value={name}
						type='text'
						placeholder='Enter Name'
						onChange={(e) => setName(e.target.value)}
						className={inputClass}
					/>
				</div>
				<div className='w-full'>
					<p className='text-xm font-light text-gray-500'>About</p>
					<textarea
						value={about}
						type='text'
						placeholder='Write something about you...'
						onChange={(e) => setAbout(e.target.value)}
						className={inputClass}
					/>
				</div>
				<div className='w-full'>
					<p className='text-xm font-light text-gray-500'>Address</p>
					<textarea
						value={address}
						type='text'
						placeholder='Address'
						onChange={(e) => setAddress(e.target.value)}
						className={inputClass}
					/>
				</div>
				<div className='w-full'>
					<p className='text-xm font-light text-gray-500'>
						Coordinates
					</p>
					<div className='flex items-center justify-center gap-4'>
						<input
							value={coord.lat}
							type='text'
							placeholder='Latitude'
							onChange={(e) =>
								setCoord((prev) => ({
									...prev,
									lat: e.target.value,
								}))
							}
							className={inputClass}
						/>
						<input
							value={coord.lng}
							type='text'
							placeholder='Longitude'
							onChange={(e) =>
								setCoord((prev) => ({
									...prev,
									lng: e.target.value,
								}))
							}
							className={inputClass}
						/>
					</div>
				</div>
				<button
					onClick={updateProfile}
					type='submit'
					className=' mt-6 relative inline-flex items-center justify-center  p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group'>
					<span className='absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease'></span>
					<span className='absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease'>
						<span className='absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md'></span>
						<span className='absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md'></span>
					</span>
					<span className='relative text-white'>Save</span>
				</button>
			</div>
		</div>
	)
}

export default Profile
