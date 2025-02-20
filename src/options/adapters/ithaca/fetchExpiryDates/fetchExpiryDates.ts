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

export const fetchExpiryDates = async (): Promise<number[]> => {
	try {
		const {
			data: { payload }
		} = await axios.post<HttpResponse<Contract[]>>(
			"https://app.ithacaprotocol.io/api/v1/clientapi/contractList",
			null,
			{ headers: { "Content-Type": "application/json" } }
		);

		const expiryList = payload.reduce<number[]>((expList, currContract) => {
			if (currContract.economics.expiry !== 990107120 && !expList.includes(currContract.economics.expiry)) {
				expList.push(currContract.economics.expiry);
			}
			return expList;
		}, []);

		console.log("Expiry dates:", expiryList); // YYMMDDHHm format

		return expiryList;
	} catch (error) {
		console.error("Failed to fetch expiry dates", error);
		return [];
	}
};
