const SITE_URL = "https://chat.openai.com/";

if (window.location.href.indexOf(SITE_URL) !== -1) {

  let newButton = document.createElement("button");

  let icon = document.createTextNode("📂");
  newButton.appendChild(icon);

  newButton.classList.add("download-button");
  newButton.addEventListener("click", function () {
    let input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";

    document.body.appendChild(input);

    input.click();

    let interval = setInterval(function () {
      newButton.style.opacity = newButton.style.opacity === "0.5" ? "1" : "0.5";
    }, 500);

    input.addEventListener("change", function () {
      let file = input.files[0];

      let reader = new FileReader();

      reader.addEventListener("load", function () {
        let buffer = reader.result;

        let textDecoder = new TextDecoder("utf-8");
        let text = textDecoder.decode(buffer);

        const chunkSize = 2048; // 4095 for ChatGPT-4;
        let textChunks = [];

        for (let i = 0; i < text.length; i += chunkSize) {
          textChunks.push(text.slice(i, i + chunkSize));
        }

        let popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.bottom = "20px";
        popup.style.right = "20px";
        popup.style.backgroundColor = "#ffffff";
        popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        popup.style.borderRadius = "5px";
        popup.style.padding = "10px";
        popup.style.display = "flex";
        popup.style.flexDirection = "column";
        popup.style.gap = "10px";

        for (let i = 0; i < textChunks.length; i++) {
          let chunkButton = document.createElement("button");
          chunkButton.textContent = `Part ${i + 1}`;
          chunkButton.style.marginBottom = "5px";
          chunkButton.style.color = "black";
          chunkButton.addEventListener("click", function () {
            let textarea = document.querySelector("textarea");
            textarea.value = textChunks[i];

            let absoluteButton = document.querySelector("button.absolute");
            absoluteButton.disabled = false;

            textarea.focus();
          });
          popup.appendChild(chunkButton);
        }

        let closeButton = document.createElement("button");
        closeButton.textContent = "close";
        closeButton.style.color = "black";
        closeButton.addEventListener("click", function () {
          document.body.removeChild(popup);
        });
        popup.appendChild(closeButton);

        document.body.appendChild(popup);
        clearInterval(interval);

        newButton.style.opacity = "1";
      });

      reader.readAsArrayBuffer(file);

      document.body.removeChild(input);
    });
  });

  newButton.style.position = "fixed";
  newButton.style.bottom = "20px";
  newButton.style.right = "20px";
  newButton.style.fontSize = "24px";
  newButton.style.padding = "10px";
  newButton.style.borderRadius = "50%";
  newButton.style.backgroundColor = "#ffffff";
  newButton.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

  document.body.appendChild(newButton);
}
