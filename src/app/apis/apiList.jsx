const BASE_URL = 'http://unipluse.com/api/';
const BASE_URL_IMAGE = 'http://unipluse.com/storage/';

export const api = {

    apiCall: {
        login: `${BASE_URL}login`,
        register: `${BASE_URL}register`,
        userShow: `${BASE_URL}users/show/`,
        userUpdate: `${BASE_URL}users/update/`,
        userDelete: `${BASE_URL}users/delete/`,
        userList: `${BASE_URL}users`,
        categoryList: `${BASE_URL}category/list`,
        categoryADD: `${BASE_URL}category/add`,
        categoryDelete: `${BASE_URL}category/delete`,
        categoryUpdate: `${BASE_URL}category/update`,
        categoryShow: `${BASE_URL}category/show`,
        productList: `${BASE_URL}product/list`,
        productAdd: `${BASE_URL}product/add`,
        productUpdate: `${BASE_URL}product/update`,
        productShow: `${BASE_URL}product/show`,
        productDelete: `${BASE_URL}product/delete`,
        resetPassword: `${BASE_URL}resetPassword`,
        sendResetLink: `${BASE_URL}sendResetLink`,
        productView: `${BASE_URL}product/view`,
        downloadManual: `${BASE_URL}download`,
        viewManual: `${BASE_URL}download`,
        saveProductQuery: `${BASE_URL}product-query/save`,
        productQueryList: `${BASE_URL}product-query/all`,
        deleteQuery: `${BASE_URL}product-query`
    },


    image: {
        imageURL: BASE_URL_IMAGE,
    },

}

