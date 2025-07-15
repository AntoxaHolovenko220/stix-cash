import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FirstStep from './components/FirstStep/FirstStep'
import { useState } from 'react'
import SecondStep from './components/SecondStep/SecondStep'

const WithdrawPage = () => {
	const { t } = useTranslation()

	const [method, setMethod] = useState<
		'paypalAddress' | 'wireTransfer' | 'walletBTCAddress'
	>('paypalAddress')
	const [checkForm, setCheckFrom] = useState(false)

	return (
		<Box>
			{!checkForm ? (
				<FirstStep
					selectedOption={method}
					setSelectedOption={setMethod}
					setCheckForm={setCheckFrom}
				/>
			) : (
				<SecondStep method={method} />
			)}
		</Box>
	)
}

export default WithdrawPage
