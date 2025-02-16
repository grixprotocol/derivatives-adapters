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

type OrderFees = {
	currencyPair: string;
	underlierAmount: number;
	numeraireAmount: number;
};

const convertDateFormat = (dateNumber: number): string => {
	const year = "20" + `${dateNumber}`.slice(0, 2);
	const month = `${dateNumber}`.slice(2, 4);
	const day = `${dateNumber}`.slice(4, 6);

	return `${year}-${month}-${day}`;
};

const createClientOrderId = (value: number = 101): number => {
	return Date.now() * Math.pow(2, 10) + value;
};

export const getLongOptionPremium = async (expiry: number, strike: number): Promise<number> => {
	try {
		const {
			data: { payload: contractList }
		} = await axios.post<HttpResponse<Contract[]>>(
			"https://app.ithacaprotocol.io/api/v1/clientapi/contractList",
			null,
			{
				headers: { "Content-Type": "application/json" }
			}
		);

		const contract = contractList.find(({ economics }) => economics.expiry === expiry && economics.strike === strike)!;
		const formattedDate = convertDateFormat(contract.economics.expiry);
		const { data: unitPrice } = await axios.get<number>(
			`https://app.ithacaprotocol.io/api/calc/price?payoff=${contract.payoff}&date=${formattedDate}&strike=${strike}`
		);
		const size = 1;
		const premium = size * unitPrice;

		const {
			data: { payload: orderFees }
		} = await axios.post<HttpResponse<OrderFees>>("https://app.ithacaprotocol.io/api/v1/clientapi/estimateOrderFees", {
			clientEthAddress: "0x0000000000000000000000000000000000000000",
			orderType: "LIMIT",
			timeInForce: "GOOD_TILL_CANCEL",
			orderGenesis: "CLIENT_PREDEFINED",
			numeraireY: true,
			clientOrderId: createClientOrderId(),
			totalNetPrice: premium.toFixed(4),
			legs: [{ contractId: contract.contractId, side: "BUY", quantity: size.toFixed(4) }]
		});

		console.log("Premium:", premium.toFixed(4));
		console.log("Protocol Fees:", orderFees.numeraireAmount);
		return premium;
	} catch (error) {
		console.error("Failed to calculate premium", error);
		return 0;
	}
};
