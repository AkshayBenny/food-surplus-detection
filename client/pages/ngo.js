import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { IoMdNavigate } from 'react-icons/io'
import { useRouter } from 'next/router'
const Ngo = () => {
	const router = useRouter()
	const [providerData, setProviderData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [servings, setServings] = useState(0)
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

	const [selectedOption, setSelectedOption] = useState('')

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

	const lat = '38.9419'
	const long = '-78.3020'
	const acceptDeliveryHandler = async () => {
		if (window.alert('Are you sure you want to accept this delivery?')) {
			window.open(
				`http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${long}`,
				'_blank'
			)
		}
	}
	// const lat = '38.9419'
	// const long = '-78.3020'
	return (
		<div className='p-12 relative min-h-screen w-full'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Provider Name
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Address
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							No. of servings
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Food type
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Action
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					<tr>
						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
							Hotel Taj
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-3'>
							<p>Hotel Taj, Taj Road, Ernakulam</p>
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
							56
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center mt-2 gap-2'>
							<div className='rounded-full w-3 h-3 bg-green-400'></div>
							<span className='text-sm font-light'>Veg</span>
						</td>
						<td className='px-3 py-4 whitespace-nowrap text-sm text-gray-500  space-x-2'>
							<button
								onClick={acceptDeliveryHandler}
								className='text-blue-500 underline'>
								Accept
							</button>
						</td>
					</tr>
					<tr>
						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
							Hotel Taj
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-3'>
							<p>Hotel Taj, Taj Road, Ernakulam</p>
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
							56
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center mt-2 gap-2'>
							<div className='rounded-full w-3 h-3 bg-red-900'></div>
							<span className='text-sm font-light'>Non-veg</span>
						</td>
						<td className='px-3 py-4 whitespace-nowrap text-sm text-gray-500  space-x-2'>
							<button
								onClick={acceptDeliveryHandler}
								className='text-blue-500 underline'>
								Accept
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Ngo
