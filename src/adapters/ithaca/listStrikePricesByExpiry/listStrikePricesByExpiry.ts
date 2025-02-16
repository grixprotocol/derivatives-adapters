import axios from "axios";

type HttpResponse<T> = {
	result: string;
	details: string;
	payload: T;
};

type Contract = {
	contractId: number;
	payoff: string;
	economics: {
		currencyPair: string;
		qtyCurrency: string;
		priceCurrency: string;
		expiry: number;
		strike?: number;
	};
	tradeable: boolean;
};

export const listStrikePricesByExpiry = async (expiry: number): Promise<number[]> => {
	try {
		const {
			data: { payload }
		} = await axios.post<HttpResponse<Contract[]>>(
			"https://app.ithacaprotocol.io/api/v1/clientapi/contractList",
			null,
			{ headers: { "Content-Type": "application/json" } }
		);

		const strikePricesByExpiry = payload.reduce<{ [expiry: number]: number[] }>((strikesByExpiry, currContract) => {
			const { expiry, strike } = currContract.economics;

			if (expiry !== 990107120 && !strikesByExpiry[expiry]) {
				strikesByExpiry[expiry] = [];
			}
			if (strike && !strikesByExpiry[expiry].includes(strike)) {
				strikesByExpiry[expiry].push(strike);
			}

			return strikesByExpiry;
		}, {});

		for (const expiry in strikePricesByExpiry) {
			if (Object.prototype.hasOwnProperty.call(strikePricesByExpiry, expiry)) {
				const strikes = strikePricesByExpiry[expiry];
				console.log(`Strikes for expiry ${expiry}:`, strikes.sort());
			}
		}

		return strikePricesByExpiry[expiry];
	} catch (error) {
		console.error("Failed to fetch strike prices by expiry", error);
		return [];
	}
};
