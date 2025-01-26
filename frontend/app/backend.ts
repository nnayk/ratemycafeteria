export async function uploadPhotos(photos: File[], schoolName: string, cafeName: string, reviewData: ReviewData) {
  const formData = new FormData();
  photos.forEach((photo) => {
    formData.append('photos', photo);
  });
  formData.append('schoolName', schoolName);
  formData.append('cafeName', cafeName);
  formData.append('reviewData', JSON.stringify(reviewData));
  console.log( 'Uploading photos...' );
  const response = await fetch('http://127.0.0.1:5000/photos/upload/', {
    method: 'POST',
    body: formData,
  });
  console.log( `Upload response: ${response.status}, message = ${response.text}` );
  return response.json();
} 
