import { useState } from 'react'

export const useModals = () => {
	const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
	const [modalInputKey, setModalInputKey] = useState<string | null>(null)
	const [modalInputValue, setModalInputValue] = useState('')
	const [modalName, setModalName] = useState('')
	const [modalZelleValues, setModalZelleValues] = useState({
		name: '',
		email: '',
		phone: '',
	})

	return {
		isWalletModalOpen,
		setIsWalletModalOpen,
		modalInputKey,
		setModalInputKey,
		modalInputValue,
		setModalInputValue,
		modalName,
		setModalName,
		modalZelleValues,
		setModalZelleValues,
	}
}
