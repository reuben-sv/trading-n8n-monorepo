export const SUPPORTED_ASSETS = ["ETH", "BTC", "SOL", "USDC", "USDT"];
export type TradingMetadata = {
	type: "LONG" | "SHORT";
	qty: number;
	symbol: (typeof SUPPORTED_ASSETS)[0];
};

export type TimerNodeMetadata = {
	time: number;
};
export type PriceTriggerMetadata = {
	asset: string;
	price: number;
};
