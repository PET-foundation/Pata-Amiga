import PostServieceMethods from '@/service/axios/posts/postsRequests';
import Swal from 'sweetalert2';

interface toDoWithPost {
  (postUuid: string, token: string, addoptUuid?: string): Promise<void>;
}

export const areYouSureAlert = (
  postUuid: string,
  token: string,
  toDoWithPost: toDoWithPost,
  tittle: string,
  text: string,
  addoptUuid?: string
) => {
  Swal.fire({
    title: 'Você tem certeza disso?',
    text: "Clique em 'SIM' para confirmar!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then(result => {
    if (result.isConfirmed) {
      toDoWithPost(postUuid, token, addoptUuid)
        .then(() => {
          Swal.fire('Excluído!', 'Seu poste foi excluído!', 'success');
        })
        .catch(error => {
          Swal.fire(
            `Error! ${error}`,
            'Ação não pode ser realizada!.',
            'error'
          );
        });
    }
  });
};
