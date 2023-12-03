import requests
import json
from bs4 import BeautifulSoup
import os

def scrape_data(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Lève une exception pour les codes HTTP d'erreur

        soup = BeautifulSoup(response.text, 'html.parser')

        items = soup.find_all('h4')

        # Extrait les textes des balises <a> dans chaque balise <li>
        titles = [a.text.strip() for item in items for a in item.find_all('a')]

        

        return titles
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la connexion au site : {e}")
        return None

if __name__ == "__main__":
    url_to_scrape = 'https://www.bsaci.org/patients/most-common-allergies/'
    
    # Vérifiez la connexion avant de scraper
    scraped_data = scrape_data(url_to_scrape)
    file_path = 'scraped_data.json'

    # Get the absolute path of the file
    absolute_path = os.path.abspath(file_path)

    # Open the file using the absolute path
    with open(absolute_path, 'w') as json_file:
        json.dump(scraped_data, json_file)

    if scraped_data is not None:
        print(scraped_data)
    else:
        print("Impossible de scraper les données en raison d'une erreur de connexion.")
