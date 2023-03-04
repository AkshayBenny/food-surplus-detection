import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const Provider = () => {
	const [providerData, setProviderData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	useEffect(() => {
		const getProviderData = async () => {
			const res = await axios.get(`${NEXT_PUBLIC_API_IP}/api/provider`)
			if (res.data) {
				setProviderData(res.data)
			}
		}
		// getProviderData()
	}, [providerData])
	return (
		<div className='p-12 relative min-h-screen w-full'>
			{showModal && (
				<div
					className='w-full h-full bg-black opacity-20 z-30 absolute top-0 left-0'
					onClick={() => setShowModal(false)}></div>
			)}
            {showModal && (<div className='absolute z-50 inset
            '>
                <input type="text" />
            </div>)}
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
