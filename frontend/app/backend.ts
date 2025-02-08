import { Review } from './db';
import { log } from "./utils/logger"; 
export async function uploadPhotos(photos: string[] | File[], schoolName: string, cafeName: string) {
  try 
  {
      const formData = new FormData();
      for (const photo of photos) {
        log( `photo = ${photo}` );
        formData.append('photos', photo);
      }
      log( 'Uploading photos...' );
      const simpleResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`);
      log( `Simple response: ${simpleResponse.status}, message = ${simpleResponse.text}` );
      const upload_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/photos/upload`;
      log( `upload_url = ${upload_url}` );
      const response = await fetch(upload_url, {
        method: 'POST',
        body: formData,
        // specify cors mode to avoid cors errors
        mode: 'cors',
      });
      log( `Upload response: ${response.status}, message = ${response.text}` );
      log("DUMMY");
      if (response.status !== 200) {
        log('Failed to upload photos');
        throw new Error('Failed to upload photos');
      }
      log( 'Photos uploaded successfully' );
      const data = await response.json();
      log( `data = ${data}` );
      // print the data keys and values
      return data['photo_urls'];
  } catch (e) {
        log('Error uploading photos: ', e);
        throw e;
    }

} 
