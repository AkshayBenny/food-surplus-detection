import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const Ngo = () => {
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
	return (
		<div className='p-12 relative min-h-screen w-full'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Name
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Location
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							Food type
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							No. of servings
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
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2'>
							<div className='rounded-full w-3 h-3 bg-green-400'></div>
							<p className='text-sm font-light'>Veg</p>
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
						<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2'>
							<div className='rounded-full w-3 h-3 bg-green-400'></div>
							<p className='text-sm font-light'>Veg</p>
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

export default Ngo
