import PostServieceMethods from "@/service/axios/posts/postsRequests"
import Swal from "sweetalert2"

export const areYouSureAlert = (postUuid: string, token: string) => {
  Swal.fire({
    title: 'Você tem certeza disso?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      PostServieceMethods.deletePostByUuid(postUuid, token)
      .then(() => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }).catch((error) => {
        Swal.fire(
          `Error! ${error}`,
          'Your file has not been deleted.',
          'error'
        )
      })
    }
  })
}