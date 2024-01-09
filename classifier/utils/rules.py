# Check if a string is just a price listing
def isPriceListing(text):
    # Remove Leading and trailing whitespace
    text = text.lower()
    text = text.strip()
    text = text.replace(",", "")
    text = text.replace(".", "")
    if text.isnumeric():
        return True

    # List of things to check for
    symbols = ["$", "€", "£", "A$", "C$", "CHF", "¥", "kr", "NZ$", "S$", "HK$", "₩",
               "₺", "₽", "₹", "R$", "R", "zł", "฿", "Rp", "Ft", "Kč", "₪", "₱", "ARS", "RM"]
    codes = ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", "SGD", "HKD", "KRW",
             "TRY", "RUB", "INR", "BRL", "ZAR", "PLN", "THB", "IDR", "HUF", "CZK", "ILS", "PHP", "ARS", "MYR"]
    keywords = ["price", "value", "special price",
                "discount", "sold for", "selling at"]


    # Check for each of the following
    for symbol in symbols:
        if text.startswith(symbol.lower()):
            return True
    for code in codes:
        if text.startswith(code.lower()):
            return True
    for keyword in keywords:
        if text.startswith(keyword.lower()):
            return True

    # If a text still manages to pass, then it is not just a price listing
    return False
