<template>
<div class="container-fluid p-8 text-center w-11/12 m-auto rounded shadow-sm" style="background: #742a2a">
    <form class="w-full max-w-lg m-auto text-black">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                </label>
                <input v-model="contact.name" class="appearance-none block w-full bg-red-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
                <p v-if="errors.name" class="text-white text-xs italic">Please fill out the name field.</p>
            </div>
            <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" for="grid-last-name">
                    Last Name
                </label>
                <input v-model="contact.lname" class="appearance-none block w-full bg-red-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
                <p v-if="errors.lname" class="text-white text-xs italic mt-3">Please fill out the last name field.</p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" for="grid-password">
                    E-mail
                </label>
                <input v-model="contact.email" class="appearance-none block w-full bg-red-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email">
                <p v-if="errors.email" class="text-white text-xs italic">Please fill out the email field.</p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" for="grid-password">
                    Message
                </label>
                <textarea v-model="contact.message" class=" no-resize appearance-none block w-full bg-red-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>
                <p v-if="errors.message" class="text-white text-xs italic">Please fill out the message field.</p>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <button @click="submit" class="shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Submit
            </button>
        </div>
    </form>

</div>
</template>

<script>
export default {
    data() {
        return {
            contact: {
                name: '',
                lname: '',
                email: '',
                message: ''
            },
            errors: {
                name: false,
                lname: false,
                email: false,
                message: false,
            }  
        }
    },

    methods: {
        displayError() {
            this.$swal('Error', 'Please fill in all required fields');
        },

        submit() {
            if(!this.contact.name) {
                this.errors.name = true;
                this.displayError();
            }
            else if(!this.contact.lname) {
                this.errors.lname = true;
                this.displayError();
            }
            else if(!this.contact.email) {
                this.errors.email = true;
                this.displayError();
            }
            else if(!this.contact.message) {
                this.errors.message = true;
                this.displayError();
            }
            else {
                this.sendContactRequest();
            }
        },

        sendContactRequest() {
            this.axios({	
                method: 'post',	
                url: 'http://localhost:8000/api/contact',	
                data : {	
                    contact: this.contact,	
                },		
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.img {
    float: right;
}
</style>
