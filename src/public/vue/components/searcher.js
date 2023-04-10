export default {
    data() {
        return {
          search: "",
        };
      },
      methods: {
        searchHandle() {
          this.$emit('search-handle', this.search)
        }
      },
    template: `
    <section class="flex-1 w-full max-w-3xl mx-auto">
        <form>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-[--fifth-color] dark:text-[--fifth-color]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    v-model="search"
                    ref="searchInput"
                    type="search" 
                    id="default-search" 
                    class="focus-visible:outline-none block p-4 pl-10 w-full text-sm text-[--fifth-color] bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--fifth-color] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca el nombre del negocio" 
                    required />
                <button
                    @click="searchHandle"
                    type="submit" 
                    class="focus-visible:outline-none text-[--fifth-color] absolute right-2.5 bottom-2.5 bg-[--primary-color] hover:bg-[--secondary-color] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[--primary-color] dark:hover:bg-[--secondary-color] dark:focus:ring-blue-800"
                >Buscar</button>
            </div>
        </form>
    </section>
    `
}