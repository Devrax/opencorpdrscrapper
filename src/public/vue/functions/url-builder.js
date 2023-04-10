export function createURLQuery(query) {
    const URLSearch = new URLSearchParams();
    URLSearch.append('utf8', '✓');
    URLSearch.append('q', query);

    return 'https://opencorporates.com/companies/do?' + URLSearch.toString();
}