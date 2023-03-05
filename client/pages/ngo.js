import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
// import { FaRegEdit } from 'react-icons/fa'
// import { AiFillDelete } from 'react-icons/ai'
import { IoMdNavigate } from 'react-icons/io'
import { useRouter } from 'next/router'
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import Link from 'next/link'
const Ngo = () => {
	const router = useRouter()
	const [providerData, setProviderData] = useState(null)
	const [status, setStatus] = useState(null)
	// console.log(providerData)
	const [showModal, setShowModal] = useState(false)
	const [servings, setServings] = useState(0)
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
	const [selectedOption, setSelectedOption] = useState('')

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value)
	}

	const lat = '38.9419'
	const long = '-78.3020'
	const acceptDeliveryHandler = async (id) => {
		const access_token = localStorage.getItem('access_token')
		const refresh_token = localStorage.getItem('refresh_token')
		const user_data = JSON.parse(localStorage.getItem('user_data'))
		// console.log(access_token, refresh_token, user_data)
		if (!access_token || !refresh_token) {
			router.push('/number')
		}
		if (!user_data || !user_data.id) return
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/surplus_status_change/`,
			{
				surplus_request_id: id,
				pickup_user_id: user_data.id,
				status: status,
			},
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		)
		// console.log(res)
		window.open(
			`http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${long}`,
			'_blank'
		)
	}
	// const lat = '38.9419'
	// const long = '-78.3020'
	return (
		<div className='p-12 relative min-h-screen w-full'>
			<nav className='bg-purple-500 text-white flex items-center justify-between p-3'>
				<h1 className='text-center font-semibold text-2xl'>
					NGO Dashboard
				</h1>
				<Link href='/profile'>
					<CgProfile size='24px' />
				</Link>
			</nav>
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
							Accept Delivery
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{providerData &&
						providerData.length > 0 &&
						providerData.map((item) => {
							return (
								<tr key={item.id}>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-3'>
										<p>
											{item.address
												? item.address
												: '_ _'}
										</p>
										<a
											href={`http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${long}`}
											target='_blank'
											className='rounded-full p-1 border border-blue-500 cursor-pointer scale-75 group hover:bg-blue-500 duration-200'>
											<IoMdNavigate
												size='20px'
												className='text-blue-500 group-hover:text-white group-hover:rotate-45 duration-200'
											/>
										</a>
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
										<select
											className='px-2 py-1'
											name='status'
											id='status'
											onChange={(e) =>
												setStatus(e.target.value)
											}>
											<option value={null}>
												Select status
											</option>
											<option value={0}>Accepted</option>
											<option value={1}>
												On the Way
											</option>
											<option value={2}>Picked Up</option>
											<option value={3}>
												Delivering
											</option>
											<option value={4}>Leftover</option>
											<option value={5}>Cancelled</option>
										</select>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										<button
											className='px-3 py-1 bg-green-500 text-white'
											onClick={() =>
												acceptDeliveryHandler(item.id)
											}>
											Save
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

export default Ngo
