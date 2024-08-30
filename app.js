const form = document.getElementById("form");
const inputs = document.querySelectorAll(".inputs");
const cards = document.querySelector(".cards");
let data = JSON.parse(localStorage.getItem("data")) || [];
const modal = document.getElementById("modal");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = { id: Date.now(), ckeck: false };
  inputs.forEach((item) => {
    obj[item.name] = item.value;
    item.value = "";
  });
  data.push(obj);
  addDisplay();
  localAdd();
});

function editFunc(id) {
  const item = data.find((item) => item.id === id);
  if (!item) return;

  let div1 = document.createElement("div");
  div1.classList =
    "fixed w-full top-0 left-0 h-screen bg-[rgba(0,0,0,0.6)] flex justify-center items-center";

  div1.innerHTML = `
      <form class="flex flex-col gap-3 bg-gray-500 py-4 px-5 rounded-md">
        <input type="text" value="${item.first_name}" id="edit-first-name" class="py-2 px-3 bg-slate-400 text-lime-400 rounded-md outline-none placeholder:text-white" placeholder="First Name">
        <input type="text" value="${item.address}" id="edit-address" class="py-2 px-3 bg-slate-400 text-lime-400 rounded-md outline-none placeholder:text-white" placeholder="Address">
        <div class="flex gap-3 justify-end">
          <button type="button" onclick="saveFunc(${item.id})" class="bg-lime-500 py-1 px-3 rounded-lg font-bold text-white">Save</button>
          <button type="button" onclick="closeFunc()" class="bg-red-500 py-1 px-3 rounded-lg font-bold text-white">Close</button>
        </div>
      </form>
    `;

  document.body.append(div1);
}

function saveFunc(id) {
  const firstName = document.getElementById("edit-first-name").value;
  const address = document.getElementById("edit-address").value;

  data = data.map((item) =>
    item.id === id ? { ...item, first_name: firstName, address: address } : item
  );
  addDisplay();
  localAdd();
  closeFunc();
}

function closeFunc() {
  const modal = document.querySelector(".fixed.w-full.top-0.left-0.h-screen");
  if (modal) modal.remove();
}

function check(id) {
  data = data.map((item) =>
    item.id === id ? { ...item, check: !item.check } : item
  );
  addDisplay();
  localAdd();
}

function addDisplay() {
  cards.innerHTML = data
    .map(
      (item) => `
      <div class="card border mt-4 p-4 gap-2 bg-gray-600 text-white w-[500px]  border-gray-400 flex justify-between items-center">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-bold ${item.check ? "line-through" : ""} ">${
        item.first_name
      }</h1>
          <p class="text-xl font-semibold ${
            item.check ? "line-through" : ""
          } ">${item.address}</p>
        </div>
        <div class="flex gap-3">
          <button onclick="editFunc(${
            item.id
          })" class="rounded-md bg-green-500 py-1 px-3 text-white">Edit</button>
          <button onclick="deleteFunc(${
            item.id
          })" class="rounded-md bg-red-500 py-1 px-3 text-white">Delete</button>
          <input type="checkbox" ${
            item.check ? "checked" : ""
          } onclick="check(${item.id})" class="w-[30px] h-[30px] text-2xl">
        </div>
      </div>`
    )
    .join("");
}

function deleteFunc(id) {
  data = data.filter((item) => item.id !== id);
  addDisplay();
  localAdd();
}

function localAdd() {
  localStorage.setItem("data", JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", addDisplay);
