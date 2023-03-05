import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const Provider = () => {
	const [providerData, setProviderData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [servings, setServings] = useState(0)
	const [selectedOption, setSelectedOption] = useState(0)
	const [preparationDate, setPreparationDate] = useState()

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value)
	}

	// fetch dashboard data
	useEffect(() => {
		const access_token = localStorage.getItem('access_token')
		const refresh_token = localStorage.getItem('refresh_token')
		// console.log(access_token, refresh_token)
		if (!access_token || !refresh_token) {
			router.push('/number')
		}
		const fetchDashBoard = async () => {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			setProviderData(res.data.surplus_requests)
		}

		fetchDashBoard()
	}, [])
	// console.log(providerData)
	// create new entry on dashboard
	const surplusFoodCreationRequest = async () => {
		const userData = JSON.parse(localStorage.getItem('user_data'))
		const access_token = localStorage.getItem('access_token')
		const user_id = userData.id
		if (userData && access_token && user_id) {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/surplus_request/`,
				{
					created_user: user_id,
					// address:
					food_type: selectedOption,
					feedable_count: servings,
					prepared_at: getCurrentDate(),
				},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			// console.log('surplus_res', res)
		}
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
									value={0}
									checked={selectedOption == 0}
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
									value={1}
									checked={selectedOption == 1}
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
									value={2}
									checked={selectedOption == 2}
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
						onClick={surplusFoodCreationRequest}
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
							Address
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Food Type
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Servings
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Status
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Actions
						</th>
					</tr>
				</thead>
				{/* address : null created : "2023-03-05T12:50:10.445002"
				created_user : 9 feedable_count : 27 food_type : 1 id : 6
				is_active : true leftover_count : "not found" pickup_org : "not
				found" pickup_status : "not found" pickup_user : "not found"
				prepared_at : "2023-03-05T12:50:00" */}
				<tbody className='bg-white divide-y divide-gray-200'>
					{providerData &&
						providerData.length > 0 &&
						providerData.map((item) => {
							return (
								<tr key={item.id}>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
										{item.address ? item.address : '_ _'}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{item.food_type === 1
											? 'Veg'
											: item.food_type === 2
											? 'Non-Veg'
											: 'Other'}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{item.feedable_count}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{item.is_active ? 'Active' : 'Inactive'}
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
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default Provider

function getCurrentDate() {
	// Create a new Date object with the current date and time
	var currentDate = new Date()

	// Get the year, month, and day from the Date object
	var year = currentDate.getFullYear()
	var month = currentDate.getMonth() + 1 // Add 1 because getMonth() returns a zero-based index
	var day = currentDate.getDate()

	// Get the hours and minutes from the Date object
	var hours = currentDate.getHours()
	var minutes = currentDate.getMinutes()

	// Add leading zeros to single-digit months, days, hours, and minutes
	if (month < 10) {
		month = '0' + month
	}
	if (day < 10) {
		day = '0' + day
	}
	if (hours < 10) {
		hours = '0' + hours
	}
	if (minutes < 10) {
		minutes = '0' + minutes
	}

	// Create a string in the desired format
	var formattedDate =
		year + '-' + month + '-' + day + ' ' + hours + ':' + minutes

	// Output the formatted date and time
	return formattedDate
}
