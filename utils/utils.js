

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// export async function dataUrlToFile(dataUrl) {
//     console.log(1, dataUrl)

//     const res = await fetch(dataUrl);
//     const blob = await res.blob();
//     console.log(2, blob)
//     const stream = blob.stream()
//     console.log(stream)
//     return blob
//     // return new File([blob], uuidv1(), { type: 'image/jpeg' });
//     // return URL.createObjectURL(blob)
// }



// export const dataURLtoBlob = (dataurl) => {
//     const arr = dataurl.split(',') 
//     const mime = arr[0].match(/:(.*?);/)[1]
//     let bstr = atob(arr[1]) 
//     let n = bstr.length
//     let u8arr = new Uint8Array(n);
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     const blob = new Blob([u8arr], {type: mime});
//     return blob
// }

// export const b64toBlob = (b64DataStr, contentType = '', sliceSize = 512) => {
//     const byteCharacters = atob(b64DataStr);
//     const byteArrays = [];
  
//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//       const slice = byteCharacters.slice(offset, offset + sliceSize);
  
//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
  
//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }
  
//     const blob = new Blob(byteArrays, { type: contentType });
//     return blob;
//   };

//   export const b64toByteArray = (string) => {
//       const data = string.split(',')[1]
//       const mime = string.split(';')[0].slice(5)
//       console.log(mime)
//       const bytes = atob(data)
//       let buf = new ArrayBuffer(bytes.length)
//       let byteArr = new Uint8Array(buf)

//       for(let i = 0; i < bytes.length; i++){
//           byteArr[i] = bytes.charCodeAt(i)
//       }

//       return byteArr
//   }