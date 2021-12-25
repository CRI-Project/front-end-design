/**
 * @param msg Message of state
 * @param color Colour of snackbar
 * @param visible Visibility of snackbar
 */
const message = {
    namespaced: true,
    state: {
        msg: '',
        color: '',
        visible: false,

    },
    // Logical processing and synchronization function
    mutations: {
        OPEN_SNACKBAR(state, options) {
            state.visible = true
            state.msg = options.msg
            state.color = options.color
        },
        CLOSE_SNACKBAR(state) {
            state.visible = false

        }
    },
    // Logical processing and asynchronous functions
    actions :{
        openSnackbar (context,options){
            context.commit('OPEN_SNACKBAR',{
                msg:options.msg,
                color:options.color
            })
            setTimeout(()=>{
                context.commit('CLOSE_SNACKBAR')
            },800)
        }
    }
}
export default message;