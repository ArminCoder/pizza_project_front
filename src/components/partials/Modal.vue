<template>
<transition name="modal-fade">
    <div 
        class="modal-backdrop z-10"
    >
        <div class="modal" :style="customStyle" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <header class="modal-header flex justify-center align-center position-relative text-info font-weight-bold" id="modalTitle">
                <slot name="title">
                    Modal
                    <button type="button" class="btn-close pr-3 pt-1 text-info" @click="close" aria-label="Close modal">
                        x
                    </button>
                </slot>
            </header>
            <section class="modal-body text-center" id="modalDescription">
                <slot name="content">
                    I'm the default body!
                </slot>
            </section>
            <footer class="modal-footer">
                <slot name="footer">
                    <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded px-4 py-2 " @click="close" aria-label="Close modal">
                        Close
                    </button>
                </slot>
            </footer>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: 'modal',

    props: {
        customStyle: {
            type: String,
            default: ''
        }
    },

    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 50vw;
    max-width: 80vw;
    max-height: 80vh;
    position: static;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    font-weight: bold;
    background: none;
}
</style>
