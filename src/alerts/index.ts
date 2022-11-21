
import { getErrorMessage } from './message'


function showError(response:any) {
    if (response.data) {
        const data = response.data
        if (data.error) {
            const message = getErrorMessage(data.error)
            return message
        } else {
            return "Đã có lỗi xảy ra"
            // toast.error('Error en la operación')
        }
    }
}


export { showError }