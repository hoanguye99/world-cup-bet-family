
const ERRORS:any = {
    40001: 'Sai username hoặc password',
    40003: 'Người dùng đã tồn tại',
    42301: 'Trận đấu đã bắt đầu và không thể sửa dữ liệu'
}

function getErrorMessage(error:any) {
    if (!ERRORS[error.code]) {
        return 'Đã có lỗi xảy ra'
    }

    if (error.code == 40002) {
        const fields = getErrorFields(error.message)
        let message = ERRORS[error.code]
        return `${message} ${fields.join(', ')}`
    }
    return ERRORS[error.code]
}

function getErrorFields(message:any) {
    const errorFields = message.split(',')
    const fields = errorFields.map((msg:any) => msg.split(' ')[2])
    return fields
}

export { getErrorMessage }