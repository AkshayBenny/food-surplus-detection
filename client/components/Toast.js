import { AiFillCloseCircle } from 'react-icons/ai'

const Toast = ({ type, message, setToast }) => {
	let toastTextClass
	switch (type) {
		case 'success':
			toastTextClass = 'text-green-500'
			break
		case 'error':
			toastTextClass = 'text-red-500'
			break
		case 'warning':
			toastTextClass = 'text-yellow-500'
			break
		case 'info':
			toastTextClass = 'text-blue-500'
			break
		default:
			toastTextClass = 'text-gray-500'
	}
	return (
		<div className='bg-white rounded-lg w-fit px-12 py-12 relative border-2 border-violet-600'>
			<button
				onClick={() => setToast(false)}
				className='absolute top-2 right-4 cursor-pointer'>
				<AiFillCloseCircle
					size='24px'
					className='text-gray-500 hover:text-red-600 duration-200'
				/>
			</button>
			<p className={`text-lg font-light ${toastTextClass}`}>{message}</p>
		</div>
	)
}

export default Toast
