import http from './http-common';

class UserService {

    getUserById(userId) {
        return http.get(`/users/${userId}`)
    }
    editUser(data){
        return http.put(`/users`,data)
    }
    getAllBookingIntents(){
        return http.get(`/bookingintents?bookingIntentState=0`)
    }
    getBookingIntentById(bookingId){
        return http.get(`/bookingintents/${bookingId}`)
    }
    postBooking(data){
        return http.post(`/bookingintents`,data)
    }
    updateBookingIntents(bookingId, active){
        return http.patch(`/bookingintents?intentId=${bookingId}&accept=${active}`)
    }
    createPosts(data){
        return http.post(`/posts`,data)
    }
    getAllPostsByUserId(userId){
        return http.get(`/posts?userId=${userId}`)
    }
    getAllPosts(){
        return http.get(`/posts`)
    }
    getAllBookingIntentsByPostId(postId){
        return http.get(`/posts/${postId}/booking_intents`)
    }
    getAllPostsByFilters(minPrice, maxPrice, districtId, active){
        return http.get(`/posts?minPrice=${minPrice}&maxPrice=${maxPrice}&districtId=${districtId}&active=${active}`)
    }
    getPostById(postId){
        return http.get(`/posts/${postId}`)
    }
    deletePostById(postId){
        return http.delete(`/posts/${postId}`)
    }
    getAllOffices(){
        return http.get(`/offices`)
    }
    getAllOfficesByUserId(userId){
        return http.get(`/offices?userId=${userId}`)
    }
    getOfficeById(officeId){
        return http.get(`/offices/${officeId}`)
    }
    createOffice(data){
        return http.post(`/offices`,data)
    }
    updateOffice(data){
        return http.put(`/offices`,data)
    }
    deleteOfficeById(officeId){
        return http.delete(`/offices/id?id=${officeId}`)
    }
}

export default new UserService();
