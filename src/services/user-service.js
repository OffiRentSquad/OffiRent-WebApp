import http from './http-common';

class UserService {

    getUserById(userId) {
        return http.get(`/users/${userId}`)
    }
    editUser(data){
        return http.put(`/users`,data)
    }
    getSendBookingIntentsByUserId(userId){
        return http.get(`/bookingintents?bookingIntentState=0&userId=${userId}`)
    }
    getRecordBookingIntentByUserId(userId){
        return http.get(`/bookingintents?userId=${userId}&bookingIntentState=1&bookingIntentState=2&bookingIntentState=3`)
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
    getAllPostsByUserId(){
        return http.get(`/posts?active=true`)
    }
    getAllPostsByPostState(postState){
        return http.get(`/posts?postState=${postState}`)
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
    getActiveReservationsByUserId(userId){
        return http.get(`/users/${userId}/reservations?reservationState=0`)
    }
    getRecordOfReservationsByUserId(userId){
        return http.get(`/users/${userId}/reservations?reservationState=1&reservationState=2&reservationState=3`)
    }

}

export default new UserService();
