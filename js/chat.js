function sendMessage() {
  const input = document.getElementById("chatInput");
  const user = document.getElementById("userSelector").value;
  const chatWindow = document.getElementById("chatWindow");

  if (input.value.trim() === "") return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${user}`;
  msgDiv.innerText = input.value;
  chatWindow.appendChild(msgDiv);

  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.getElementById("chatInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
