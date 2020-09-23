<template>
    <div @click="$emit('choosePizza')" class="my-2 cursor-pointer">
       <div class="mb-2">
           <img class="pizzaImage" :src="image">
       </div>
       <span class="text-white text-2xl">{{name}}</span>
       <br>
       <span class="text-white text-2xl my-2">Price: {{(price * activeCurrency.rate).toFixed(2)}} {{activeCurrency.symbol}}</span>
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
        max-width: 300px;
        height: 250px;
        object-fit: contain;
    }
    
</style>
