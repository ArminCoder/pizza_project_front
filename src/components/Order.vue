<template>
    <div class="flex justify-between px-10 py-4">
        <form class="w-full max-w-lg m-auto">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name <span class="text-red-500">*</span>
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
                    <p v-if="errors.name" class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Last Name <span class="text-red-500">*</span>
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Address <span class="text-red-500">*</span>
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" type="email">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Phone <span class="text-red-500">*</span>
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" type="phone">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Message
                    </label>
                    <textarea class="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-20 resize-none" id="message"></textarea>
                    <p class="text-gray-600 text-xs italic w-full text-left pl-2">* - required fields  </p>
                </div>
            </div>
        </form>
        <div class="flex flex-col pl-4 w-full mb-12 justify-end">
            <div class="border-b border-gray-500 pb-2">
                <span class="text-bold text-black">{{products.length}} items</span>
            </div>
            <div class="flex items-center justify-between my-2">
                <img class="w-12 h-12 text-black" src="/images/margarita.png">
                <span class="text-black">{{activeCurrency.currency == 'EUR' ? '€' : '$' }} {{productsPrice}}</span>
            </div>
            <div class="flex items-center justify-between my-2">
                <span class="text-black text-md">SHIPPING:</span>
                <div class="flex items-center">
                    <span class="text-black">{{activeCurrency.currency == 'EUR' ? '€' : '$' }}</span>
                    <span class="text-black">{{shipping}}</span>
                </div>
            </div>
            <div class="flex items-center justify-between my-2">
                    <span class="text-black text-bold text-md">TOTAL:</span>
                <div class="flex items-center">
                    <span class="text-black">{{activeCurrency.currency == 'EUR' ? '€' : '$' }}</span>
                    <span class="text-black">{{totalPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        products: {
            default: {}
        },

        activeCurrency: {
            default: null
        },
    },

    data() {
        return {
            errors: {
                name: false,
                lname: false,
                address: false,
                phone: false,
            },
            productsPrice: 0,
            shipping: 10,
            totalPrice: 0
        }
    },

    mounted() {
        this.calculatePrice();
    },

    methods: {
        calculatePrice() {
            this.products.forEach((product) => {
                this.productsPrice = this.productsPrice + parseInt(product.pizza.price);
            })

            this.totalPrice = this.productsPrice + this.shipping;
        }
    }
}
</script>
