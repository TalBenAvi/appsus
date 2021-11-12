export const googleApiServices = {
    getBooks,
}


function getBooks(value) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`)
        .then(res => {
            return res.data.items
        })
        .catch(err => {
            return err + 'Could not Load any Books data'
        })
}