<template>
    <div>
        <select v-if="currentCurrency" class="form-control" @change="changeCurrency" v-model="currencyName">
            <option v-for="currency in currencies" :key="currency.id" :value="currency.currency">
                {{currency.currency}} {{currency.symbol}}
            </option>
        </select>
    </div>
</template>

<script>
    import {eventBus} from '../app';

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

