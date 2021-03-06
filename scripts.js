const button = document.querySelector('button');
const video  = document.querySelector('video');
const displayMedia = async () => {
    const captureStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = captureStream;
    video.onloadedmetadata = () => {
        video.play();
    } 
}
if ('pictureInPictureEnabled' in document){ // here it's checking without click event on the button
    displayMedia();
    button.disabled = false;
    button.style.display = "block";
    button.addEventListener('click',async () => {
        if (video.srcObject !== null){
            if (document.pictureInPictureElement){
               try {
                document.exitPictureInPicture();  
               } catch (error) {
                   console.log('error in exiting the screen: ',error)
               } 
                
            }else {
                try {
                    video.requestPictureInPicture()
                } catch (error) {
                    console.log('error in requesting pic in pic api: ',error)
                }
            }
        }else{
            displayMedia();
        }
    });
    
}else{
    alert('your browser doesn\'t support PICTURE IN PICTURE');
}

video.addEventListener('enterpictureinpicture', () => {
    button.textContent = 'Exit Picture-in-Picture mode';
  });
  
  video.addEventListener('leavepictureinpicture', () => {
    button.textContent = 'Enter Picture-in-Picture mode';
  });
