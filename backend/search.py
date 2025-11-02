import re

def normalize_text(text):
    """
    Normalizes text for searching by converting to lowercase, replacing
    common separators with spaces, and removing non-alphanumeric characters.
    
    For example, "iPhone+11_Pro.jpg" becomes "iphone 11 pro".
    """
    # Convert to lowercase
    text = text.lower()
    # Replace common separators like -, _, +, and . with spaces
    text = re.sub(r'[\_\-\+\.]', ' ', text)
    # Remove any characters that are not letters, numbers, or spaces
    text = re.sub(r'[^a-z0-9\s]', '', text)
    # Replace multiple spaces with a single space and strip leading/trailing whitespace
    normalized_text = ' '.join(text.split())
    return normalized_text

def find_product_by_query(query, products_db):
    """
    Searches for a product in the database based on a query string.
    It normalizes the query and the product keywords for a more robust search.

    Args:
        query (str): The search query (e.g., "iphone+11-pro.jpg").
        products_db (list): A list of product dictionaries. Each product
                            should have a 'keywords' list (e.g., from your seed.json).

    Returns:
        dict: The first matching product dictionary, or None if no match is found.
    """
    # Normalize the input query, and also remove file extensions
    query_without_extension = query.rsplit('.', 1)[0]
    normalized_query = normalize_text(query_without_extension)

    # First, look for a perfect match with one of the keywords
    for product in products_db:
        for keyword in product.get('keywords', []):
            normalized_keyword = normalize_text(keyword)
            if normalized_query == normalized_keyword:
                # Perfect match found
                return product

    # If no perfect match, try a looser match where all query words are present
    # in the combined keywords of a product.
    query_words = set(normalized_query.split())
    if not query_words:
        return None
        
    for product in products_db:
        # Combine all keywords for the product into a single string
        all_keywords_str = ' '.join(product.get('keywords', []))
        normalized_product_keywords = normalize_text(all_keywords_str)
        product_words = set(normalized_product_keywords.split())
        
        # Check if all words from the query are present in the product's keywords
        if query_words.issubset(product_words):
            # Found a product that contains all the words from the query
            return product

    return None
