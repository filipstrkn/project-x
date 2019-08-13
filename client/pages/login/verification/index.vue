<template>
    <section>
        <h1>Verification</h1>
        <h2 v-if="isVerified">You are verified</h2>
    </section>
</template>


<script>
export default {
    middleware: 'verify',
    data: () => ({
        isVerified: false
    }),
    mounted() {

    }
}

</script>