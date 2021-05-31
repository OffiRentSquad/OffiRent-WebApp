import http from './http-common';
import authHeader from "@/services/auth-header";

class UserService {

    createUser(data) {
        return http.post(`/users`, data)
    }
    getUserById(userId) {
        return http.get(`/users/${userId}`, { headers: authHeader() })
    }
    editUser(data){
        return http.put(`/users`,data, { headers: authHeader() })
    }
    getSendBookingIntentsByUserId(userId){
        return http.get(`/bookingintents?bookingIntentState=0&userId=${userId}`, { headers: authHeader() })
    }
    getRecordBookingIntentByUserId(userId){
        return http.get(`/bookingintents?userId=${userId}&bookingIntentState!=0`, { headers: authHeader() })
    }
    getBookingIntentById(bookingId){
        return http.get(`/bookingintents/${bookingId}`, { headers: authHeader() })
    }
    postBooking(data){
        return http.post(`/bookingintents`,data, { headers: authHeader() })
    }
    cancelBookingIntentById(bookingId){
        return http.delete(`bookingintents/id?id=${bookingId}`, { headers: authHeader() })
    }
    updateBookingIntents(bookingId, active){
        return http.patch(`/bookingintents?intentId=${bookingId}&accept=${active}`,{ headers: authHeader() },{ headers: authHeader() })
    }
    createPosts(data){
        return http.post(`/posts`,data, { headers: authHeader() })
    }
    getAllPostsByUserId(){
        return http.get(`/posts?active=true`, { headers: authHeader() })
    }
    getAllPostsByPostState(postState){
        return http.get(`/posts?postState=${postState}`, { headers: authHeader() })
    }
    getAllBookingIntentsByPostId(postId){
        return http.get(`/bookingintents?bookingIntentState=0&postId=${postId}`, { headers: authHeader() })
    }
    getAllPostsByFilters(minPrice, maxPrice, districtId, active){
        return http.get(`/posts?minPrice=${minPrice}&maxPrice=${maxPrice}&districtId=${districtId}&active=${active}`, { headers: authHeader() })
    }
    getPostById(postId){
        return http.get(`/posts/${postId}`, { headers: authHeader() })
    }
    deletePostById(postId){
        return http.delete(`/posts/${postId}`, { headers: authHeader() })
    }
    getAllOffices(){
        return http.get(`/offices`, { headers: authHeader() })
    }
    getAllOfficesByUserId(userId){
        return http.get(`/offices?userId=${userId}`, { headers: authHeader() })
    }
    getOfficeById(officeId){
        return http.get(`/offices/${officeId}`, { headers: authHeader() })
    }
    createOffice(data){
        return http.post(`/offices`,data, { headers: authHeader() })
    }
    updateOffice(data){
        return http.put(`/offices`,data, { headers: authHeader() })
    }
    deleteOfficeById(officeId){
        return http.delete(`/offices/id?id=${officeId}`, { headers: authHeader() })
    }
    getActiveReservationsByUserId(userId){
        return http.get(`/users/${userId}/reservations?reservationState=0`, { headers: authHeader() })
    }
    getRecordOfReservationsByUserId(userId){
        return http.get(`/users/${userId}/reservations?reservationState=1`, { headers: authHeader() })
    }

}

export default new UserService();
