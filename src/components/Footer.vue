<template>
    <footer class="page-footer font-small bg-black">
        <div class="footer- text-center py-3 text-white">
            <span class="mr-2">© {{year}}</span>
            <span>Pizza Project</span>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>
