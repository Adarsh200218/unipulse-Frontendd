// const BASE_URL = 'https://api.unipulseinstruments.com/api/';
// const BASE_URL_IMAGE = 'https://api.unipulseinstruments.com/storage/';

const BASE_URL = 'http://localhost:8000/api/';
const BASE_URL_IMAGE = 'http://localhost:8000/storage/';

export const api = {

    apiCall: {
        login: `${BASE_URL}login`,
        register: `${BASE_URL}register`,
        userShow: `${BASE_URL}users/show/`,
        userUpdate: `${BASE_URL}users/update/`,
        userDelete: `${BASE_URL}users/delete/`,
        userList: `${BASE_URL}users`,
        categoryReorder: `${BASE_URL}category/reorder`,
        categoryList: `${BASE_URL}category/list`,
        categoryADD: `${BASE_URL}category/add`,
        categoryDelete: `${BASE_URL}category/delete`,
        categoryUpdate: `${BASE_URL}category/update`,
        categoryShow: `${BASE_URL}category/show`,
        productReorder: `${BASE_URL}product/reorder`,
        productList: `${BASE_URL}product/list`,
        productAdd: `${BASE_URL}product/add`,
        productUpdate: `${BASE_URL}product/update`,
        productShow: `${BASE_URL}product/show`,
        productDelete: `${BASE_URL}product/delete`,
        productPositionUpdate: `${BASE_URL}product/update-position`,
        resetPassword: `${BASE_URL}resetPassword`,
        sendResetLink: `${BASE_URL}sendResetLink`,
        productView: `${BASE_URL}product/view`,
        downloadManual: `${BASE_URL}download`,
        viewManual: `${BASE_URL}download`,
        saveProductQuery: `${BASE_URL}product-query/save`,
        productQueryList: `${BASE_URL}product-query/all`,
        requestPurposalShow: `${BASE_URL}request-purposal/list`,
        requestPurposalAdd: `${BASE_URL}request-purposal/add`,
        requestPurposalDelete: `${BASE_URL}request-purposal/delete/`,
        exportproductQuery: `${BASE_URL}product-query/export`,
        deleteQuery: `${BASE_URL}product-query`,
        resendVerficationEmail: `${BASE_URL}resend-verification`,
        verifyEmail: `${BASE_URL}verify-email`,
        // ===== BANNER =====
        bannerReorder: `${BASE_URL}banner/reorder`,
        getBanners: `${BASE_URL}banners/index`,
        storeBanner: `${BASE_URL}banners/add`,
        showBanner: `${BASE_URL}banner/show`,
        updateBanner: `${BASE_URL}banners/update`,
        deleteBanner: `${BASE_URL}banners/delete`,
        // ===== ABOUT =====
        getAbout: `${BASE_URL}about/list`,
        saveAbout: `${BASE_URL}about/save`,
        showAbout: `${BASE_URL}about/show`,
        deleteAbout: `${BASE_URL}about/delete`,
        contactUs: `${BASE_URL}contact/store`,
    },

    image: {
        imageURL: BASE_URL_IMAGE,
    },

}

