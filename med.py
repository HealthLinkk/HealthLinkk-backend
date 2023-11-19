import requests
import json
from bs4 import BeautifulSoup

def scrape_medications(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Lève une exception pour les codes HTTP d'erreur

        soup = BeautifulSoup(response.text, 'html.parser')

        # Trouver toutes les balises <li> qui contiennent des balises <a>
        medication_items = soup.find_all('li')

        # Extrait les textes des balises <a> dans chaque balise <li>
        medications = [a.text.strip() for item in medication_items for a in item.find_all('a')]

        return medications
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la connexion au site : {e}")
        return None

if __name__ == "__main__":
    url_to_scrape = 'https://www.doctissimo.fr/asp/medicaments/les-medicaments-les-plus-prescrits.htm'
    
    # Vérifiez la connexion avant de scraper
    scraped_medications = scrape_medications(url_to_scrape)
    with open('C:\\Users\\Aziz Bouharb\\Desktop\\scraped_medications.json', 'w') as json_file:
        json.dump(scraped_medications, json_file)

    if scraped_medications is not None:
        print(scraped_medications)
    else:
        print("Impossible de scraper les données en raison d'une erreur de connexion.")
