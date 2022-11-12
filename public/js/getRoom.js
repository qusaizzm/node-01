const RadioBtn = document.getElementById("stock");
const RoomOptions = document.getElementById("RoomData");
const YOUR_API_ENDPOINT = ""

RadioBtn.onclick( async (e) => {
    let Response = await fetch(YOUR_API_ENDPOINT)
    let data = await Response.json()
    RoomOptions.innerHTML = `
        ${data.forEach(element => {
            return `<option id="roomId" name="roomId" value="${element._id}">
            ${element.roomNO}
        </option>`
        })}
    `;
})