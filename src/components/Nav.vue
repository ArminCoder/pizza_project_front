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
                    <title>Pizza Project</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div class="w-1/2 block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
                <router-link class="block mx-2 mt-8 lg:inline-block font-sans text-lg  lg:mt-0 text-teal-200 hover:text-white " to="/">Home</router-link> 
                <router-link class="block mx-2 mt-8 lg:inline-block font-sans text-lg  lg:mt-0 text-teal-200 hover:text-white " to="/contact">Contact us</router-link>
            </div>
            <div class="w-1/2 flex-grow flex items-center justify-end cursor-pointer">
                <a @click="showCart" class="mr-4 block mt-4 lg:inline-block  lg:mt-0 font-sans text-lg text-teal-200 hover:text-white ">
                    <span v-if="hasItems" class="h6 text-primary mr-2">
                        {{hasItems}}
                    </span>    
                    <i class="fa fa-shopping-cart" :class="{ 'text-primary' : hasItems }" />
                </a>
                <a class="-mb-2 cursor-pointer">
                    <currency :activeCurrency="activeCurrency" :currencies="currencies" />
                </a>
            </div>
        </div>
    </nav>
    <modal 
        class="flex px-4 py-2 leading-none rounded text-white mt-4 lg:mt-0" 
        v-show="modal.open" 
        :customStyle="checkoutStyle"
        @close="modal.open = false; checkout = false"
    >
        <template v-slot:title>
            <span class="text-xl" v-if="!checkout">
                Your Shopping Cart
            </span>
            <span class="text-xl" v-else>
                Checkout
            </span>
        </template>
        <template v-slot:content>
            <div v-if="!checkout">
                <cart @productRemoved="updateCart" :products="cart" :activeCurrency="activeCurrency" />
            </div>
            <div v-else>
                <order @error='onError' @startOrder='startOrder' ref='order' @checkout="closeModal" :products="cart" :activeCurrency="activeCurrency" />
            </div>
        </template>
        <template v-slot:footer>
            <div v-if="!checkout" class="w-full flex justify-between">
                <button @click="closeModal" class="bg-gray-300 hover:bg-gray-600 text-gray-600 hover:text-white font-bold py-2 px-4 border border-gray-300 rounded">
                    Close
                </button>
                <button @click="toCheckout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Go to checkout
                </button>
            </div>
            <div v-else class="w-full flex justify-between">
                <button @click="checkout = false" class="bg-gray-300 hover:bg-gray-600 text-gray-600 hover:text-white font-bold py-2 px-4 border border-gray-300 rounded">
                    Cancel
                </button>
                <button @click="placeOrder" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Place Order
                </button>
            </div>
        </template>  
    </modal>
</div>
</template>

<script>
import Modal from './partials/Modal';
import Currency from './Currency';
import Cart from './Cart';
import Order from './Order';
import {eventBus} from '../main';

export default {
    components: {
        Modal,
        Currency,
        Cart,
        Order
    },

    props: {
        currencies: {
            default: {}
        },

        activeCurrency: {
            default: {}
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
            checkout: false,
            cart: null,
            hasItems: null,
            checkoutStyle: ''
        }
    },

    methods: {
        onError() {
            this.$swal('Error', 'Please fill in all required input fields.');
        },
        startOrder(customer) {
            let config = {	
                headers: {	
                    'Access-Control-Allow-Origin': '*',	
                    'Content-Type': 'application/json',	
                },	
            };	

            this.axios({	
                method: 'post',	
                url: 'http://localhost:8000/api/place-order',	
                data : {	
                    customer: customer,	
                    order: this.cart	
                },	
                config	
            })
                
            this.$swal('Success', 'Your order was successfully placed!');
            
            localStorage.removeItem('products');

            this.getCartLocalStorage();
        },

        toCheckout() {
            this.checkout = true;
            this.checkoutStyle = 'min-width: 80vw'
        },

        closeModal() {
            this.modal.open = false;
            this.checkout = false;
        },

        placeOrder() {
            this.$refs.order.verifyOrder();
        },

        getCartLocalStorage() {
            if (window.localStorage.getItem('products')) {
                this.cart = JSON.parse(window.localStorage.getItem('products'));
                this.hasItems = this.cart.length;
            }
        },

        showCart() {
            this.modal.open = true;
        },

        updateCart() {
            this.getCartLocalStorage();
        },
    },
    
     mounted() {
        this.getCartLocalStorage();

        eventBus.$on('updatedCart', () => {
            this.getCartLocalStorage();
        });
    }
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
