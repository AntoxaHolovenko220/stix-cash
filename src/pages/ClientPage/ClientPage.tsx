import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Loader } from '@/components'
import { Client, getClient } from '@/api/clientService'
import { ClientEditForm, CreateTransactionForm } from './components'

const ClientPage = () => {
	const { t } = useTranslation()
	const { id } = useParams<{ id: string }>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [client, setClient] = useState<Client>()

	useEffect(() => {
		const fetchClient = async () => {
			try {
				if (!id) {
					setError(t('Client ID not provided'))
					return
				}
				const data = await getClient(id)
				setClient(data)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch client:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchClient()
	}, [id, t])

	if (loading) return <Loader />
	if (error || !client) return <Typography color='error'>{error}</Typography>

	return (
		<Box>
			<Typography sx={{ ml: '2px', fontFamily: 'Manrope', fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>
					{t('admin menu')} | {t('clients')}
				</span>{' '}
				| {id}
			</Typography>

			<Box
				sx={{ mt: '30px', display: 'flex', justifyContent: 'space-between' }}
			>
				<ClientEditForm
					client={client}
					loading={loading}
					error={error}
					id={id}
					setClient={setClient}
				/>
				<CreateTransactionForm />
			</Box>
		</Box>
	)
}

export default ClientPage
