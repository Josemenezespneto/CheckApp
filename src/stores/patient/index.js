import api from "../../services/api"

const apiService = api.getInstance()

const patientStore = {
    async getPatients(start, limit, sortBy, ascending, searchText, searchField) {
        try {
            let query = `start=${start}&limit=${limit}&sortBy=${sortBy}&asc=${ascending}&include=me.files`

            if (searchField && searchText) {
                query += `&searchText=${encodeURIComponent(searchText)}&searchField=${encodeURIComponent(searchField)}`
            }

            const { data } = await apiService.get(`patients?${query}`)

            return data
        } catch (error) {
            console.error("Erro ao buscar pacientes:", error)
            return []
        }
    }
}

export default patientStore
