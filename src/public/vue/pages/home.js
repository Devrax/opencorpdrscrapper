import Searcher from '../components/searcher.js';
import CompanyItem from '../components/company-item.js';
import { createURLQuery } from '../functions/url-builder.js';
const { reactive } = Vue;

export default {
    name: 'HomePage',
    components: {
        Searcher,
        CompanyItem
    },
    setup() {

        const defaultSearcherMessage = '🔍 Coloca el nombre de la empresa en el buscador 🔎',
            noMatchesSearcherMessage = '😓Tal parece no tenemos registros sobre la empresa que buscas 🚧';

        const companiesState = reactive({
            searchMessage: defaultSearcherMessage,
            companies: [],
            loading: false
        });

        const handleInputValue = async (value) => {
            companiesState.loading = true;

            try {
                const baseURL = 'https://openbusiness.up.railway.app';
                const url = createURLQuery(value);
                const response = await fetch(`${baseURL}/companies?url=${encodeURIComponent(url)}`);
                const { result, message, code } = await response.json();
                
                if(message) {
                    const msg = '';
                    switch(code) {
                        case '000':
                            msg = '🚨💻🆘 Ocurrió un error del lado del servidor. 😔';
                            break;
                        case '001':
                            msg = noMatchesSearcherMessage
                            break;
                        case '002':
                            msg = '🔄🔟⏰ Vuelve a intentarlo dentro de 10 minutos, 🚥 el servidor experimenta alto tráfico. 🚀';
                            break;
                        default:
                            msg = `${message} - ${code}`;
                            break;
                    }
                    companiesState.searchMessage = msg;
                    return;
                };
    
                companiesState.companies = result.map(company => {
                    company.location = company.location?.toLowerCase() || 'N/A';
                    return company;
                });
                companiesState.searchMessage = companiesState.companies.length === 0 
                ? '😓Tal parece no tenemos registros sobre la empresa que buscas 🚧'
                : defaultSearcherMessage;
                
            } catch (error) {
                console.log(error);
            } finally {
                companiesState.loading = false;
            }
        };

        return { companiesState, handleInputValue }
    },
    template: `
        <div>

            <article class="max-w-3xl mx-auto">

                <Searcher v-on:search-handle="handleInputValue"/>

                <div class="my-3 opacity-40">
                    <span class="registered-legend" title="Cumple con sus obligaciones fiscales y tributarias, ha presentado sus declaraciones de impuestos de manera adecuada y ha pagado los impuestos correspondientes.">
                        Registrado
                    </span>
                    &nbsp;|&nbsp;
                    <span class="inactive-legend" title="No ha presentado declaraciones de impuestos ni ha realizado transacciones comerciales durante un período de tiempo determinado.">
                        Inactivo
                    </span>
                </div>

                <section 
                    v-if="!companiesState.loading && companiesState.companies.length === 0"
                    class="text-2xl flex h-48 justify-center items-center text-[--third-color]"
                >

                    <span class="inline-block w-1/2 text-center">

                        {{ companiesState.searchMessage }}

                    </span>

                </section>

                <section v-if="!companiesState.loading && companiesState.companies.length !== 0">
                
                    <CompanyItem
                        v-for="company in companiesState.companies"
                        :key="company.companyName"
                        :company="company"
                        @retrieveCompany=""
                    />

                </section>

                <section v-if="companiesState.loading">

                    <CompanyItem
                        v-for="skeleton in [1,2,3,4,5,6,7,8,9,10,11,12]"
                        :key="skeleton"
                        :isLoading="true"
                    />              

                </section>

            </article>

        </div>
    `
  }