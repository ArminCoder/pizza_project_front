<template>
    <div>
        <select v-if="currentCurrency" class="shadow appearance-none border text-sm border-white bg-white-900 rounded w-full py-2 px-3 text-grey mb-3 leading-tight focus:outline-none focus:shadow-outline" @change="changeCurrency" v-model="currencyName">
            <option v-for="currency in currencies" :key="currency.id" :value="currency.currency">
                {{currency.currency}} {{currency.symbol}}
            </option>
        </select>
    </div>
</template>

<script>
    import {eventBus} from '../main';

    export default {
        props: {
            currencies: {
                default: {}
            },

            activeCurrency: {
                default: null
            },
        },

        data() {
            return {
                currentCurrency: null,
                currencyName: null
            }
        },

        methods: {
            changeCurrency() {
                this.currencies.forEach(curr => {
                    if(curr.currency == this.currencyName) {
                        eventBus.$emit('currentCurrency', curr);
                    }
                })
            }
        },

        mounted() {
            this.currentCurrency = this.activeCurrency;
            this.currencyName = this.activeCurrency.currency
        }
}
</script>

