import PostServieceMethods from "@/service/axios/posts/postsRequests"
import Swal from "sweetalert2"

export const areYouSureAlert = (postUuid: string, token: string) => {
  Swal.fire({
    title: 'Você tem certeza disso?',
    text: "Clique em 'SIM' para confirmar!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.isConfirmed) {
      PostServieceMethods.deletePostByUuid(postUuid, token)
      .then(() => {
        Swal.fire(
          'Excluído!',
          'Seu poste foi excluído!',
          'success'
        )
      }).catch((error) => {
        Swal.fire(
          `Error! ${error}`,
          'Seu poste não foi excluído!.',
          'error'
        )
      })
    }
  })
}