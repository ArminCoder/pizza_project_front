<template>
    <div style="max-height: 500px" class="overflow-y-auto">
        <div>
            You currently don't have any items in your shopping cart.
        </div>
        <div v-for="(item, index) in pizzas" :key="index" class="border-b py-2">
            <div class="flex justify-between items-center">
                <img class="w-32 h-16" :src="item.pizza.image" alt="">
                <div class="flex flex-col">
                    <span class="text-gray-800 my-1">
                        {{item.pizza.name}}
                    </span>
                    <span class="text-gray-800 my-1">
                        {{Number(item.pizza.price).toFixed(2) }} {{activeCurrency.currency}}
                    </span>
                </div>
                <div>
                    <span @click="removeItem(item, index)" class="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full text-sm mr-2">
                        Remove
                    </span>
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

        computed: {
            pizzas() {
                return this.products;
            }
        },

        methods: {
            removeItem(item, index) {
                this.pizzas.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(this.pizzas));

                this.$emit('productRemoved');
            }
        }
}
</script>

<style lang="scss" scoped>

</style>
