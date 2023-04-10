import Header from './container/Header.js';

export default {
    components: {
        Header
    },
    template: `
        <div>
            
            <Header />

            <main class="p-3">
                <router-view></router-view>
            </main>
        </div>
    `,
}