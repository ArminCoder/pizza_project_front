<template>
<div id="app" class="container-fluid pb-6">
    <navigation v-if="activeCurrency && currencies" :activeCurrency="activeCurrency" :currencies="currencies" :cart="cart" />
    <router-view />
    <footer-component/>
</div>
</template>

<script>
import Navigation from './components/Nav';
import FooterComponent from './components/Footer';

export default {
    components: { Navigation, FooterComponent },
    data() {
        return {
            currencies: {},
            activeCurrency: null,
            cart: [],
        }
    },

    created() {
        this.getCurrencyRates();
        this.getCartLocalStorage();
    },

    methods: {
        getCartLocalStorage() {
            if (window.localStorage.getItem('products')) {
                this.cart = JSON.parse(window.localStorage.getItem('products'));
            }
        },

        getCurrencyRates() {
            this.axios.get('http://localhost:8000/api/currencies').then(res => {
                this.currencies = res.data;
                this.currencies.forEach(currency => {
                    if (currency.active) {
                        this.activeCurrency = currency;
                    }
                });
            })
        },
    }
}
</script>

<style>
.footerwrapper {
    height: 530px;
    background: #252b33;
    margin-top: -50px;
    border-top: 4px solid #a8aaad;
}

footer {
    text-align: center;
}

footer h2 {
    font-family: OSWALD-regular;
    font-size: 20px;
    color: #dedede;
}

footer h2 {
    margin-bottom: 40px;
}
</style>
