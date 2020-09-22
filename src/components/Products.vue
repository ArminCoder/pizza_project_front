<template>
    <div style="margin-top: 100px">
        <div class="bestdisheswrapper">
            <div id="bestdishes" class="container">
                <h2 class="text-uppercase" data-wow-delay="0.3s">
                    {{header}}
                </h2>
                <div>
                    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        <pizza 
                            @choosePizza="choosePizza(pizza)"
                            v-for="pizza in pizzas" 
                            :key="pizza.id" 
                            :id="pizza.id"
                            :activeCurrency="activeCurrency"
                            :name='pizza.name' 
                            :image='pizza.image' 
                            :price='pizza.price' 
                        />
                    </div>
                </div> 
            </div> 
        </div>
        <modal
            v-show="modal.open"
            @close="modal.open = false"
        >
            <template v-slot:title>
                {{chosenPizza.name}}
            </template>
            <template v-slot:content>
                <div class="flex p-4 mr-4">
                    <div class="w-50">
                        <img style="max-width: 100%" :src="chosenPizza.image" alt="">
                    </div>
                    <div class="flex flex-col align-start justify-start text-left ml-4 pl-4">
                        <div class="flex">
                            <span class="mr-2">Price:</span>
                            <span>{{chosenPizza.price * activeCurrency.rate}}</span>
                            <span class="ml-2">{{activeCurrency.currency}}</span>
                        </div>
                        <div class="mt-4 flex">
                            <span class="flex">Quantity: </span>
                            <select v-model="chosenPizza.quantity" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ml-2" name="quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div class="mt-4 flex">
                            Total: 
                            <span class="ml-2">{{chosenPizza.price * activeCurrency.rate * chosenPizza.quantity}} {{activeCurrency.currency}}</span>
                        </div>
                        <div class="mt-4">
                            <button @click="addToCart" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from './partials/Modal';
import Pizza from './Pizza';

export default {
    components: {
        Modal, Pizza
    },

    props: {
        pizzas: {
            type: Array,
            required: true
        },

        activeCurrency: {
            required: true,
            default: {}
        }   
    },

    data() {
        return {
            header: 'Pizzas',
            chosenPizza: {
                name: '',
                price: null,
                image: '',
                quantity: 1
            },
            productId: 0,
            modal: {
                open: false
            }
        }
    },

    methods: {
        addToCart() {
            let products = [];
            if(localStorage.getItem('products')){
                products = JSON.parse(localStorage.getItem('products'));
            }

            this.productId += 1;
            products.push({'productId' : this.productId, pizza : this.chosenPizza});

            this.$emit('updatedCart');

            localStorage.setItem('products', JSON.stringify(products));
        },

        choosePizza(pizza) {
            this.modal.open = true;
            this.chosenPizza.id = pizza.id;
            this.chosenPizza.name = pizza.name;
            this.chosenPizza.price = pizza.price;
            this.chosenPizza.image = pizza.image;
        }
    }
}

    
</script>

<style lang="scss" >
.vueperslides__arrow {
    background: rgba(0,0,0,0.7);
}

</style>


