import axios from 'axios'
import { useState } from 'react'

const Number = () => {
	const [number, setNumber] = useState(null)
	const submitHandler = async (e) => {
		e.preventDefault()
		const res = await axios.post(
			'/api/number',
			{ number },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}
	return (
		<div className='flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 py-12'>
			<form
				onSubmit={submitHandler}
				className='flex flex-col items-center justify-center gap-4'>
				<input
					value={number}
					type='text'
					inputMode='numeric'
					onChange={(e) => setNumber(e.target.value)}
					placeholder='Enter phone number'
					className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparen'
				/>
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
