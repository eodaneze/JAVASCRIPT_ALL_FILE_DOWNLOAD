const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading File..."
  // console.log(fileInput.value);
  fetchFile(fileInput.value);
});

function fetchFile(url) {
    // fetching file and returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
        // URL.createObjectURL creates a url of passed object

        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        // aTag.download = "filename";
        aTag.download = url.replace(/^.*[\\\/]/, '');

        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove()

        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download File"
        
    //   console.log(file);
      console.log(tempUrl);
    }).catch(() => {
        downloadBtn.innerText = "Download File";
        alert("Failed to download file!!")
    })
}
