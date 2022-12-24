<template>
    <div>

        
    </div>

</template>

<script>


export default {
    name: "IndexPage",
    data() {
        return {
            
        };
    },
    mounted() {
        // eslint-disable-next-line nuxt/no-env-in-hooks
        if (process.client) {
            this.$scrollTo('#__nuxt', 0, { force: true })
        }
    },
    methods: {
    }
}
</script>
