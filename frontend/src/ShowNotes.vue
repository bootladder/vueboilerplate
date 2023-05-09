<script setup>
    import {onMounted,ref} from "vue"
      const props = defineProps(['notes'])

    onMounted( () => {
    })
</script>
<template>
    <div class="border border-black p-2 bg-gray-100 text-xs w-fit">
        Show Notes
        <div class="flex flex-col">
            <div v-for="(v,k) in notes">
                <div v-for="(vv,kk) in v">
                    {{vv}}
                </div>
            </div>
        </div>
    </div>
</template>
