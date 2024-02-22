import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('azle-app')
export class AzleApp extends LitElement {
    @property()
    db = {};

    constructor() {
        super();
        this.getBooks();
    }

    async getBooks() {
        this.db = 'Loading...';

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/books`
        );
        const responseJson = await response.json();

        this.db = responseJson;
    }

    async updateBooks() {
        this.db = 'Loading...';

        const response = await fetch(
            `${import.meta.env.VITE_CANISTER_ORIGIN}/books`,
            {
                method: 'POST',
                headers: [['Content-Type', 'application/json']],
                body: JSON.stringify({
                    id: '987',
                    title: 'Dracula',
                    author: 'Bram Stoker'
                })
            }
        );
        const responseJson = await response.json();

        this.db = responseJson;
    }

    render() {
        return html`
            <h1>Azle Día 3</h1>

            <div>db: ${JSON.stringify(this.db)}</div>

            <br />

            <div>
                <button @click=${this.getBooks}>Test GET /books</button>
            </div>

            <br />

            <div>
                <button @click=${this.updateBooks}>Test POST /books</button>
            </div>
        `;
    }
}
