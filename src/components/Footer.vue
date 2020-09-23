<template>
    <footer class="page-footer font-small bg-black fixed bottom-0 w-full">
        <div class="footer- text-center text-white">
            <span class="mr-2 text-sm">© {{year}}</span>
            <span class="text-sm">Pizza Project</span>
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
