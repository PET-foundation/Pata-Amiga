import { PostResponse } from "@/service/axios/user/userResponses";

export function quickSort(arr: PostResponse[], left = 0, right = arr.length - 1): void {
  const index = partition(arr, left, right);
  if (left < index - 1) {
    quickSort(arr, left, index - 1);
  }
  if (index < right) {
    quickSort(arr, index + 1, right);
  }
 }
 
 function partition(arr: PostResponse[], left: number, right: number): number {
  const pivot = new Date(arr[right].createdAt);
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (new Date(arr[j].createdAt) <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
 }
 
 
    