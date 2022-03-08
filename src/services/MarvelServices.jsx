export default class MarvelServices {
    #apiBase = 'https://gateway.marvel.com:443/v1/public/';
    #apiKey = 'apikey=8d579cefc987124f5003a8682a604694';

    async getResource(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters() {
        return this.getResource(`${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`);
    }

    getCharacter(id) {
        return this.getResource(`${this.#apiBase}characters/${id}?${this.#apiKey}`);
    }
}
