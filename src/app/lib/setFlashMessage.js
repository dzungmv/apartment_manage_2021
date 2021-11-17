function setFlashMessage(type, title, message) {
    return {
        type: 'error',
        title: 'Invalid account',
        message: 'Google account not inside TDTu'
    }
}
module.exports = setFlashMessage;
