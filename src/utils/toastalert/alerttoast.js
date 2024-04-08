import toast from 'react-hot-toast'
const successtoast = (message) => {
    toast.success(message, {
        duration: 2000,
        position: 'top-center',
        style: {
            color: '#ffff',
            backgroundColor: "#1ec938"
        }
    })
}
const errortoast = (message) => {
    toast.error(message, {
        duration: 2000,
        position: 'top-center',
        style: {
            color: '#ffff',
            backgroundColor: "red"
        }
    })
}

export {successtoast,errortoast}