import axios from 'axios'

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price'
const CACHE_TTL_MS = 5 * 60 * 1000

let cachedRate: number | null = null
let cachedAt = 0
let pendingRequest: Promise<number> | null = null

const getFallbackRate = () => {
	const fromEnv = Number(import.meta.env.VITE_BTC_USD_RATE)
	return Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : 100_000
}

/** Актуальный курс BTC/USD (CoinGecko, бесплатно, без API-ключа). */
export async function fetchBtcUsdRate(): Promise<number> {
	if (cachedRate && Date.now() - cachedAt < CACHE_TTL_MS) {
		return cachedRate
	}

	if (pendingRequest) {
		return pendingRequest
	}

	pendingRequest = axios
		.get<{ bitcoin: { usd: number } }>(COINGECKO_URL, {
			params: { ids: 'bitcoin', vs_currencies: 'usd' },
			timeout: 10_000,
		})
		.then(({ data }) => {
			const rate = data?.bitcoin?.usd
			if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) {
				throw new Error('Invalid BTC/USD rate from API')
			}
			cachedRate = rate
			cachedAt = Date.now()
			return rate
		})
		.catch(err => {
			console.warn('BTC rate fetch failed, using fallback:', err)
			return getFallbackRate()
		})
		.finally(() => {
			pendingRequest = null
		})

	return pendingRequest
}
