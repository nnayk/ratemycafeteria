import { Review } from './db';
export async function uploadPhotos(photos: File[], schoolName: string, cafeName: string) {
  const formData = new FormData();
  photos.forEach((photo) => {
    console.log('adding to formData -- Photo:', photo.name);
    formData.append('photos', photo);
  });
  console.log( 'Uploading photos...' );
  const response = await fetch('http://127.0.0.1:5000/photos/upload', {
    method: 'POST',
    body: formData,
  });
  console.log( `Upload response: ${response.status}, message = ${response.text}` );
  return response.json();
} 
