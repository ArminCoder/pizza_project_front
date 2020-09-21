<template>
    <div @click="$emit('choosePizza')" class="my-2">
       <div class="mb-2">
           <img class="pizzaImage" :src="image">
       </div>
       <span class="text-light h3">{{name}}</span>
       <br>
       <span class="text-white h4 my-2">Price: {{(price * activeCurrency.rate).toFixed(2)}} {{activeCurrency.symbol}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            image: {
                type: String,
                required: true
            },

            price: {
                type: String,
                required: true
            },

            activeCurrency: {
                default: {}
            }
        },
}
</script>

<style lang="scss" scoped>
    .pizzaImage {
        max-width: 200px;
    }
</style>
