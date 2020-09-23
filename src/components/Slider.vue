<template>
 <div>
     <div class="sliderwrapper mb-4">
         <div id="slider">
             <div class="slider">
                 <vueper-slides fade :touchable="false">
                     <vueper-slide @click.native="pizzaInfo($event, slide)" style='margin-top:-100px;' v-for="(slide, i) in slides" :key="i" :content="slide.content" />
                 </vueper-slides>
             </div>
         </div>
     </div>
     <modal v-show="modal.open" @close="modal.open = false">
         <template v-slot:title>
             {{chosenPizza.name}}
         </template>
         <template v-slot:content>
             <div class="flex p-4 mr-4">
                 <div class="w-50">
                     <img style="max-width: 100%" :src="chosenPizza.image" alt="">
                 </div>
                 <div class="flex w-50 pt-4 mt-4 flex-col align-start justify-start text-left ml-4 pl-4">
                     {{chosenPizza.description}}
                 </div>
             </div>
         </template>
     </modal>
 </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import Modal from './partials/Modal.vue';

export default {
    components: { VueperSlides, VueperSlide, Modal },

    props: {
        pizzas: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            slides: [],
            modal: {
                open: false
            },
            chosenPizza: {
                name: null,
                image: null,
                content: null
            }
        }
    },

    mounted() {
        this.createContent();
    },

    methods: {
        pizzaInfo(e, pizza) {
            if (e.target.tagName != 'IMG') {
                return;
            }
            let pizzaTitle = pizza.title.replace(/<\/?[^>]+(>|$)/g, "");
            this.modal.open = true;
            this.pizzas.forEach((pizza) => {
                if (pizza.name == pizzaTitle) {
                    this.chosenPizza = pizza;
                }
            })
        },

        createContent() {
            this.pizzas.forEach(pizza => {
                this.slides.push({
                    title: `<span class='text-primary'>${pizza.name}</span>`,
                    content: `<img style='height: 300px' src='${pizza.image}'>`
                })
            })
        }
    }
}
</script>

<style lang="scss">
.vueperslides__arrow {
    background: rgba(0, 0, 0, 0.7);
    height: 100px;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    max-height: 800px;
    position: absolute;
    border-radius: 30px;
    filter: brightness(0.9);
}

.vueperslide__content {
    cursor: pointer;
}
</style>
