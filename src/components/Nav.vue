<template>
    <div class="headerwrapper">
        <nav class="z-10 fixed bg-red-900 shadow-md opacity-90 z-5 w-full h-15 px-5 py-2 flex justify-between items-center">
            <div class="flex items- flex-shrink-0 text-white mr-6">
                <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                <span class="font-semibold text-xl tracking-tight">LOGO</span>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>HOME</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div class="w-1/2 block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-sm lg:flex-grow">
                    <a href="#responsive-header" class="block mt-8 lg:inline-block mr-10 ml-10 font-sans text-lg  lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Home
                    </a>
                    <a href="#responsive-header" class="block mt-4 lg:inline-block ml-10 lg:mt-0 font-sans text-lg text-teal-200 hover:text-white mr-4">
                        About us
                    </a>
                </div>
                <div class="w-1/2 flex-grow flex items-center justify-end ">
                    <a @click="showCart" href="#responsive-header" class="block mt-4 lg:inline-block ml-10 lg:mt-0 font-sans text-lg text-teal-200 hover:text-white mr-4">
                        <span v-if="cart.length" class="h6 text-primary mr-2" v-text="cart.length" />
                        <i class="fa fa-shopping-cart" :class="{ 'text-primary' : cart.length }" />
                    </a>
                    <a class="-mb-2">
                        <currency :activeCurrency="activeCurrency" :currencies="currencies" />
                    </a>
                </div>
            </div>
        </nav>
        <modal class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" v-show="modal.open" @close="modal.open = false">
            <template v-slot:title>
                Your Shopping Cart
            </template>
            <template v-slot:content>
                <span class="d-flex pl-4" v-if="!cart.length">
                    You currently don't have any items in your shopping cart...
                </span>
                <modal class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" v-show="modal.open" @close="modal.open = false">
                    <template v-slot:title>
                        Your Shopping Cart
                    </template>
                    <template v-slot:content>
                        <span class="flex pl-4" v-if="!cart.length">
                            You currently don't have any items in your shopping cart...
                        </span>
                        <div v-else>
                            <cart :products="cart" />
                        </div>
                    </template>
                </modal>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from './partials/Modal';
import Currency from './Currency';
import Cart from './Cart';

export default {
    components: {
        Modal,
        Currency,
        Cart
    },

    props: {
        currencies: {
            default: {}
        },

        activeCurrency: {
            default: {}
        },

        cart: {
            default: []
        }
    },

    data() {
        return {
            modal: {
                open: false,
                title: null,
                content: null,
                footer: null
            },
        }
    },

    methods: {
        showCart() {
            this.modal.open = true;
        }
    },
}
</script>

<style lang="scss" scoped>
.headerwrapper {
    height: 55px;
    nav {
        height: 55px;
    }
}
</style>
