import { Review } from './db';
export async function uploadPhotos(photos: string[] | File[], schoolName: string, cafeName: string) {
  try 
  {
      const formData = new FormData();
      for (const photo of photos) {
        console.log( `photo = ${photo}` );
        formData.append('photos', photo);
      }
      console.log( 'Uploading photos...' );
      const simpleResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`);
      console.log( `Simple response: ${simpleResponse.status}, message = ${simpleResponse.text}` );
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/photos/upload`, {
        method: 'POST',
        body: formData,
        // specify cors mode to avoid cors errors
        mode: 'cors',
      });
      console.log( `Upload response: ${response.status}, message = ${response.text}` );
      console.log("DUMMY");
      if (response.status !== 200) {
        console.error('Failed to upload photos');
        throw new Error('Failed to upload photos');
      }
      console.log( 'Photos uploaded successfully' );
      const data = await response.json();
      console.log( `data = ${data}` );
      // print the data keys and values
      return data['photo_urls'];
  } catch (e) {
        console.error('Error uploading photos: ', e);
        throw e;
    }

} 
