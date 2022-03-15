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

    async getAllCharacters() {
        const res = await this.getResource(`${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`);
        return await res.data.results.map(item => this._transformCharacters(item));
    }

    async getCharacter(id) {
        const response = await this.getResource(`${this.#apiBase}characters/${id}?${this.#apiKey}`);
        return this._transformCharacter(response);
    }

    /**
     * Трансфорирует данные от api
     * @param {Promise} res
     * @returns {{thumbnail: string, wiki, name, description: (* | string), homepage}}
     * @private
     */
    _transformCharacter(res) {
        const route = res.data.results[0];
        return {
            name: route.name,
            description: route.description.length ? route.description : 'There is no description for this character',
            thumbnail: `${route.thumbnail.path}.${route.thumbnail.extension}`,
            homepage: route.urls[0].url,
            wiki: route.urls[1].url,
            comics: route.comics.items
        };

    }

    _transformCharacters(res) {
        return {
            id: res.id,
            name: res.name,
            description: res.description.length ? res.description : 'There is no description for this character',
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url
        };

    }
}
