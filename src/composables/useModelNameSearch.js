import { ref, computed } from "vue";

export default function useModelNameSearch(models) {
    const searchQuery = ref("");
    const modelsMatchingSearchQuery = computed(() => {
        return models.value.filter(model => model.name.includes(searchQuery.value))
    });

    return {
        searchQuery,
        modelsMatchingSearchQuery
    }
}