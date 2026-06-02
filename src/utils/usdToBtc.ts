/** Конвертация USD → BTC для отображения эквивалента (баланс хранится в USD). */
export const usdToBtc = (
	usdBalance: number | string,
	btcUsdRate: number
): string => {
	const usd = Number(usdBalance)
	if (!Number.isFinite(usd) || usd <= 0) return '0'
	if (!Number.isFinite(btcUsdRate) || btcUsdRate <= 0) return '0'

	return (usd / btcUsdRate).toFixed(8)
}
