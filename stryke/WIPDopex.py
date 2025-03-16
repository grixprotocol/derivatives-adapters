import requests


def get_market_data(asset, strike_range):
    # Assuming asset parameter affects the URL
    market_url = f"https://api.dopex.io/v2/ssov/{asset.lower()}"
    price_url = f"https://api.dopex.io/v2/price/{asset.lower()}"

    headers = {"accept": "application/json"}

    try:
        # Fetch market data for the specific asset
        market_response = requests.get(market_url, headers=headers)
        market_response.raise_for_status()
        market_data = market_response.json()  # Directly convert response to JSON

        # Fetch price data for the specific asset
        price_response = requests.get(price_url, headers=headers)
        price_response.raise_for_status()
        price_data = price_response.json()  # Directly convert response to JSON

    except requests.RequestException as e:
        print(f"Error fetching data for {asset}: {e}")
        return

    # Example of how to use fetched data:
    print(f"Price data for {asset}: {price_data}")
    # Assuming the structure of market_data allows, iterate and filter based on strike_range
    for item in market_data.get('data', []):  # Adjust based on actual structure
        strike = float(item.get("strike", 0))
        # Adjust key based on actual structure
        spot_price = float(price_data.get("spot_price", 0))
        if spot_price - strike_range < strike < spot_price + strike_range:
            print(f"Relevant Market Data: {item}")
            # Further processing as required


def main():
    assets = [("ETH", 400), ("BTC", 4000)]
    for asset, strike_range in assets:
        get_market_data(asset, strike_range)


if __name__ == "__main__":
    main()
