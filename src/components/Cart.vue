<template>
    <div>
        <div class="flex" v-for="(item, index) in products" :key="index">
            <img class="w-32" :src="item.pizza.image" alt="">
            <div>
                <span>
                    {{item.pizza.name}}
                </span>
                <br>
                <span>
                    {{Number(item.pizza.price).toFixed(2) }} currency
                </span>
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
        },
}
</script>

<style lang="scss" scoped>

</style>
