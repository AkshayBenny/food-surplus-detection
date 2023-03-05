import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const Provider = () => {
	const [providerData, setProviderData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [servings, setServings] = useState(0)
	const [selectedOption, setSelectedOption] = useState('')
	useEffect(() => {
		const getProviderData = async () => {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_IP}/api/provider`
			)
			if (res.data) {
				setProviderData(res.data)
			}
		}
		// getProviderData()
	}, [providerData])


	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value)
	}

	const addBatch = async () => {
		// const res = await axios.post(
		// 	`${NEXT_PUBLIC_API_IP}/api/provider/addBatch`,
		// 	{ servings, type: selectedOption }
		// )
		// if (res.data) {
		// 	setProviderData(res.data)
		// }
		setShowModal(false)
	}
	return (
		<div className='p-12 relative min-h-screen w-full'>
			{showModal && (
				<div
					className='w-full h-full bg-black opacity-20 z-30 absolute top-0 left-0'
					onClick={() => setShowModal(false)}></div>
			)}
			{showModal && (
				<div
					className='absolute flex flex-col justify-center items-center w-fit z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-3 rounded-md space-y-6
            '>
					<div className='space-y-2 w-full'>
						<p className='text-xm font-light text-gray-500 text-start'>
							Enter food type
						</p>
						<div className='flex  space-x-4'>
							<label className='inline-flex items-center'>
								<input
									type='radio'
									value='veg'
									checked={selectedOption === 'veg'}
									onChange={handleOptionChange}
									className='form-radio h-5 w-5 text-green-600'
								/>
								<span className='ml-2 text-gray-700 text-sm font-light'>
									Veg
								</span>
							</label>
							<label className='inline-flex items-center'>
								<input
									type='radio'
									value='nonveg'
									checked={selectedOption === 'nonveg'}
									onChange={handleOptionChange}
									className='form-radio h-5 w-5 text-red-600'
								/>
								<span className='ml-2 text-gray-700 text-sm font-light'>
									Non-veg
								</span>
							</label>
							<label className='inline-flex items-center'>
								<input
									type='radio'
									value='other'
									checked={selectedOption === 'other'}
									onChange={handleOptionChange}
									className='form-radio h-5 w-5 text-blue-600'
								/>
								<span className='ml-2 text-gray-700 text-sm font-light'>
									Other
								</span>
							</label>
						</div>
					</div>
					<div className='space-y-3'>
						<p className='text-xm font-light text-gray-500'>
							How many servings can you donate?
						</p>
						<input
							value={servings}
							onChange={(e) => setServings(e.target.value)}
							inputMode='numeric'
							type='number'
							min={0}
							placeholder='How many servings?'
							className='border focus:ring-0 appearance-none focus:outline-0 rounded-lg px-4 py-3 w-full'
						/>
					</div>
					<button
						onClick={addBatch}
						className='w-fit my-6 relative inline-flex items-center justify-center  p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group'>
						<span className='absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease'></span>
						<span className='absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease'>
							<span className='absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md'></span>
							<span className='absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md'></span>
						</span>
						<span className='relative text-white'>
							Add new batch
						</span>
					</button>
				</div>
			)}
			<button
				onClick={() => setShowModal(true)}
				className=' my-6 relative inline-flex items-center justify-center  p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group'>
				<span className='absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease'></span>
				<span className='absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease'>
					<span className='absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md'></span>
					<span className='absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md'></span>
				</span>
				<span className='relative text-white'>Add new batch</span>
			</button>

			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Name
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Email
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Role
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Action
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					<tr>
						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
							John Doe
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
							john.doe@example.com
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
							Admin
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center justify-start gap-3'>
							<button
								onClick={() => setShowModal(true)}
								className='rounded-full group p-2 hover:bg-violet-500 duration-200  cursor-pointer'>
								<FaRegEdit
									size='18px'
									className='group-hover:text-white text-violet-500'
								/>
							</button>
							<button
								onClick={() => setShowModal(true)}
								className='rounded-full group p-2 hover:bg-red-500 duration-200  cursor-pointer'>
								<AiFillDelete
									size='20px'
									className='group-hover:text-white text-red-500'
								/>
							</button>
						</td>
					</tr>
					<tr>
						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
							Jane Smith
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
							jane.smith@example.com
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
							User
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center justify-start gap-3'>
							<button
								onClick={() => setShowModal(true)}
								className='rounded-full group p-2 hover:bg-violet-500 duration-200  cursor-pointer'>
								<FaRegEdit
									size='18px'
									className='group-hover:text-white text-violet-500'
								/>
							</button>
							<button
								onClick={() => setShowModal(true)}
								className='rounded-full group p-2 hover:bg-red-500 duration-200  cursor-pointer'>
								<AiFillDelete
									size='20px'
									className='group-hover:text-white text-red-500'
								/>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Provider
