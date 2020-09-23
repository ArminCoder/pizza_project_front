<template>
    <div style="margin-top: 100px">
        <div class="bestdisheswrapper">
            <div id="bestdishes" class="container">
                <h2 class="text-uppercase" data-wow-delay="0.3s">
                    {{header}}
                </h2>
                <div>
                    <div style="grid-template-columns: repeat(4,1fr); display: grid;">
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
                <div class="d-flex p-4 mr-4">
                    <div class="w-50">
                        <img style="max-width: 100%" :src="chosenPizza.image" alt="">
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-start text-left ml-4 pl-4">
                        <div class="d-flex">
                            <span class="mr-2">Price:</span>
                            <span>{{chosenPizza.price * activeCurrency.rate}}</span>
                            <span class="ml-2">{{activeCurrency.currency}}</span>
                        </div>
                        <div class="mt-4 d-flex">
                            <span class="d-flex">Quantity: </span>
                            <select v-model="chosenPizza.quantity" class="form-control ml-2" name="quantity">
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
                        <div class="mt-4 d-flex">
                            Total: 
                            <span class="ml-2">{{chosenPizza.price * activeCurrency.rate * chosenPizza.quantity}} {{activeCurrency.currency}}</span>
                        </div>
                        <div class="mt-4">
                            <button @click="addToCart" class="btn btn-info">
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
            modal: {
                open: false
            }
        }
    },

    methods: {
        addToCart() {
            this.$emit('addToCart', this.chosenPizza);
        },

        choosePizza(pizza) {
            this.modal.open = true;
            this.chosenPizza.id = pizza.id;
            this.chosenPizza.name = pizza.name;
            this.chosenPizza.price = pizza.price;
            this.chosenPizza.image = pizza.image;
            this.modalValue = pizza
        }
    }
}

    
</script>

<style lang="scss" >
.vueperslides__arrow {
    background: rgba(0,0,0,0.7);
    z-index: -1;
}

.bestdisheswrapper #bestdishes h2::after {
    content: url(/images/rectangle.png);
    position: relative;
    margin-left: 15px;
    top: -10px;
    z-index: -1;
    min-height: 442px;
    max-height: 440px;
    background-size: cover;
    border-top: 3px solid rgba(255, 153, 0, 0.2);
    border-bottom: 3px solid rgba(255, 153, 0, 0.4);
    text-align: center;
}

.bestdisheswrapper {
    min-height: 442px;
    background: url(/images/www3.jpg) no-repeat center center fixed;
    background-size: cover;
    border-top: 3px solid rgba(255, 153, 0, 0.2);
    border-bottom: 3px solid rgba(255, 153, 0, 0.4);
    text-align: center;
    filter: brightness(0.8);
    -webkit-box-shadow: 10px -10px 66px -12px rgb(0, 0, 0);
    -moz-box-shadow: 10px -10px 66px -12px rgb(0, 0, 0);
    box-shadow: 10px -10px 66px -12px rgb(0, 0, 0);

}





</style>


