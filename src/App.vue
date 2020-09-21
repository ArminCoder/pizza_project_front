<template>
    <div id="app" class="container-fluid">
        <navigation 
            v-if="activeCurrency && currencies"
            :cart="cart" 
            :activeCurrency="activeCurrency"
            :currencies="currencies"

        />
        <slider 
            v-if="pizzas" 
            :pizzas="pizzas" 
        />
        <products 
            @addToCart="addToCart" 
            v-if="pizzas && activeCurrency" 
            :pizzas="pizzas"
            :activeCurrency="activeCurrency"
        />
        <footer-component/>
        <modal
            v-show="modal.open"
            @close="closeModal"
        >
            <template v-slot:title>
                {{modal.title}}
            </template>
        </modal>
    </div>
</template>

<script>
import Navigation from './components/Nav.vue';
import Slider from './components/Slider.vue';
import Products from './components/Products.vue';
import Modal from './components/partials/Modal.vue';
import FooterComponent from './components/Footer.vue';
import {eventBus} from './main';

    export default {
        name: 'App',

        components: {
            Navigation, Slider, Products, Modal, FooterComponent
        },

        data() {
            return {
                pizzas: null,
                modal: {
                    open: false,
                    title: null,
                    content: null,
                    footer: null
                },
                cart: [],
                currencies: {},
                activeCurrency: null
            }
        },

        created() {
            this.getPizzas();
            this.getCurrencyRates();
        },

        methods: {
            getCurrencyRates() {
                this.axios.get('/api/currencies').then(res => {
                    this.currencies = res.data;
                    this.currencies.forEach(currency => {
                        if(currency.active) {
                            this.activeCurrency = currency;
                        }
                    });
                })
            },

            addToCart(e) {
                this.cart.push(e);
            },

            getPizzas() {
                this.axios.get('/api/pizzas').then(res => {
                    this.pizzas = res.data;
                })
            },
            showModal() {
                this.modal.open = true;
            },
            closeModal() {
                this.modal.open = false;
            }
        },

        mounted() {
            eventBus.$on('currentCurrency', (curr) => {
                this.activeCurrency = curr;
            })
        }
    }
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
