export async function uploadPhotos(photos: File[], schoolName: string, cafeName: string, reviewData: ReviewData) {
  const formData = new FormData();
  photos.forEach((photo) => {
    console.log('adding to formData -- Photo:', photo.name);
    formData.append('photos', photo);
  });
  // formData.append('reviewData', JSON.stringify(reviewData));
  const photo_url = `foofoo`; // TODO: make it a combo of schoolName, cafeName, review id, and photo index (i.e. 0th photo, 1st photo, 2nd photo)
  formData.append('photo_url',photo_url);
  console.log( 'Uploading photos...' );
  const response = await fetch('http://127.0.0.1:5000/photos/upload', {
    method: 'POST',
    body: formData,
  });
  console.log( `Upload response: ${response.status}, message = ${response.text}` );
  return response.json();
} 
