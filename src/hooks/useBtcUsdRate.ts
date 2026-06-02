import { useEffect, useState } from 'react'
import { fetchBtcUsdRate } from '@/api/btcRateService'

export const useBtcUsdRate = (enabled: boolean) => {
	const [btcUsdRate, setBtcUsdRate] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!enabled) {
			setBtcUsdRate(null)
			return
		}

		let cancelled = false
		setLoading(true)

		fetchBtcUsdRate()
			.then(rate => {
				if (!cancelled) setBtcUsdRate(rate)
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [enabled])

	return { btcUsdRate, loading }
}
