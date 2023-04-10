export default {
    name: 'CompanyItem',
    props: {
        company: {},
        isLoading: false
    },
    template: `
        <div
            v-if="!isLoading"
            :class="company.status"
            @click="$emit('retrieveCompany', company.companyHref)"
            class="p-2 rounded bg-[--third-color] my-2 text-[--primary-color] transition-transform scale-95 hover:scale-100 active:scale-95 relative overflow-hidden"
        >
            <h1 class="flex font-extrabold">
                <span>
                    {{ company.companyName }}
                </span>
                <a :href="company.googleLocation" target="_blank" rel="noopener noreferrer nofollow external">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                    </svg>                          
                </a>
            </h1>
            <div>
                <span class="block capitalize text-[--secondary-color] truncate">
                    {{ company.location}}
                </span>
            </div>
        </div>
        <div
            v-else
            class="p-2 rounded bg-[--third-color] my-2 text-[--primary-color] transition-transform scale-95 relative overflow-hidden inactive"
        >
            <h1 class="flex font-extrabold mb-[1.6px]">
                <span class="w-48 h-[23px] bg-[--primary-color] animate-pulse"></span>
                <a href="#" target="_blank" rel="noopener noreferrer nofollow external" class="animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
                    </svg>                          
                </a>
            </h1>
            <div>
                <span class="block w-96 h-[23px] animate-pulse bg-[--primary-color]"></span>
            </div>
        </div>  
    `
}