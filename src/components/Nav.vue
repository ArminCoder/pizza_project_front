<template>
    <div class="headerwrapper">
        <div id="header">
            <div class="logo"> 
                <h1>Logo</h1>
            </div> 
            <nav>
                <ul>
                    <li>
                        <a class="text-red-500">
                            HOME
                        </a>
                    </li>
                    <li>
                        <a>
                            CONTACT
                        </a>
                    </li>
                    <li @click="showCart">
                        <a>
                            <span 
                                v-if="cart.length"
                                class="h6 text-primary"
                                v-text="cart.length"
                            />
                            <i 
                                class="fa fa-shopping-cart"
                                :class="{ 'text-primary' : cart.length }"
                            />
                        </a>
                    </li>
                    <li>
                        <currency 
                            :activeCurrency="activeCurrency"
                            :currencies="currencies"
                        />
                    </li>
                </ul>
            </nav>
            <modal
                v-show="modal.open"
                @close="modal.open = false"
            >
                <template v-slot:title>
                    Your Shopping Cart
                </template>
                <template v-slot:content>
                    <span class="flex pl-4" v-if="!cart.length">
                        You currently don't have any items in your shopping cart...
                    </span>
                    <div v-else  class="flex" v-for="(item, index) in cart" :key="index">
                        <div>
                            <img :src="item.image" alt="">
                        </div>
                        <div>
                            <span>
                                {{item.name}}
                            </span>
                            <br>
                            <span>
                                {{item.price.toFixed(2) }} {{currency}}
                            </span>

                        </div>
                    </div>
                </template>
            </modal>
        </div> 
    </div>
</template>

<script>
   import Modal from './partials/Modal';
   import Currency from './Currency';
    
    export default {
        components: {
            Modal, Currency
        },

        props: { 
            cart: {
                type: Array,
                required: false
            },

            currencies: {
                default: {}
            },

            activeCurrency: {
                default: {}
            },
        },

        data() {
            return {
                modal: {
                    open: false,
                    title: null,
                    content: null,
                    footer: null
                }
            }
        },

        methods: {
            showCart() {
               this.modal.open = true;
            }
        },
    }
</script>

<style scoped lang='scss'>

</style>
