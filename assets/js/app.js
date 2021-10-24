const showCase = document.querySelector(".show_case")
const headerList = document.querySelector(".header_list")
let foodsData = []

// get data from json file
const getData = async () => {
    let url = ` http://localhost:3000/foods`
    await fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                const menuItem = document.createElement("div")
                menuItem.classList.add("menu_item", "col-md-6", "mb-5")
                menuItem.setAttribute("data-type", `${element.type}`)
                menuItem.innerHTML = `
                <img class="img-fluid" src="${element.img}" alt="${element.title}">
                <div>
                    <div class="item_header d-flex justify-content-between border-bottom">
                        <h5>${element.title}</h5>
                        <p>$${element.price}</p>
                    </div>
                    <p class="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis autem quaerat, eveniet ab non numquam veniam minus asperiores,</p>
                    </div>`
                foodsData.push(menuItem)
                showCase.append(menuItem)
            })

            // Filter Btn
            const filterButtons = data.reduce((value, item) => {
                if (!value.includes(item.type)) { value.push(item.type) }
                return value
            }, ["all"])

            filterButtons.forEach(item => headerList.insertAdjacentHTML("beforeend", `<li data-type="${item}" class="filter_btn">${item}</li>`))
            document.querySelectorAll(".filter_btn").forEach(btn => btn.addEventListener("click", () => filterList(btn)))
        })
}

// FilterList
const filterList = btn => {
    foodsData.forEach(item => {
        item.style.display = 'none'

        if (btn.dataset.type === "all") { item.style.display = 'flex' }
        else if (btn.dataset.type === item.dataset.type) {
            item.style.display = 'flex'
        }
    })
}

// Events
window.addEventListener("load", () => getData())





