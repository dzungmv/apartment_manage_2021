function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");
        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);
        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
        const icons = {
            success: "checkmark-circle-outline",
            info: "information-circle-outline",
            warning: "alert-circle-outline",
            error: "bug-outline"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <ion-icon name="${icon}"></ion-icon>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}


function showSuccessToast(message, title = "Successfully") {
    toast({
        title: title,
        message: message,
        type: 'success',
        duration: 3000
    })
}

function showErrorToast(message, title = "Error") {
    toast({
        title: title,
        message: message,
        type: 'error',
        duration: 3000
    })
}





let dropDown = document.querySelector('.drop-down')
dropDown.addEventListener('click', () => {
    document.querySelector('.menu-dropdown').style.display = 'block'
})

window.addEventListener('click', (e) => {
    if (!e.target.closest('.drop-down')) {
        document.querySelector('.menu-dropdown').style.display = 'none'
    }
})

let tabs = document.querySelectorAll('.tab-list .tab-item')
let homeItems = document.querySelectorAll('.home-item')
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => {
            t.className = "tab-item"
        })
        tab.className = "tab-item active"
        homeItems.forEach(item => {
            item.className = item.classList[0] + ' home-item'
        })
        homeItems[index].className = homeItems[index].classList[0] + ' ' + homeItems[index].classList[1] + " active"
    })
})

let btnOpenModalChangePassword = document.querySelector('.change-password')
btnOpenModalChangePassword.addEventListener('click', () => {
    document.querySelector('#modal-change-password').checked = true
})
let imgDepartments = ["pcthssv", 'pdh', 'psdh', 'pdtvmt', 'pktvkdcl', 'ptc', 'tdtclc', 'ttth', 'sdtc', 'atem', "tthtdnvcsv", 'kl', 'ttnnthbdvh', 'vcsktvkd', 'kmtcn', 'kddt', 'kcntt', 'kqtkd', 'kmtvbhld', 'kldcd', 'ktcnh', 'kgdqt'];


let departments = ["Phòng CTHSSV", "Phòng Đại Học", "Phòng Sau Đại Học", "Phòng Điện Toán Và Máy Tính", "Phòng Khảo Thí Và Kiểm Định Chất Lượng", "Phòng Tài Chính", "TDT Creative Language Center", "Trung Tâm Tin Học", "Trung Tâm Đào Tạo phát triển xã hội(SDTC)", "Trung Tâm Phát Triển Khoa Học Quản Lý và Ứng Dụng Công Nghệ (ATEM)", "Trung Tâm Hợp Tác Doanh Nghiệp Và Cựu Sinh Viên", "Khoa Luật", "Trung Tâm Ngoại Ngữ Tin Học Bồi Dưỡng Văn Hóa", " Viện chính sách kinh tế và kinh doanh", "Khoa Mỹ thuật công nghiệp", "Khoa Điện – Điện tử", "Khoa Công nghệ thông tin", "Khoa Quản trị kinh doanh", "Khoa Môi trường và bảo hộ lao động", "Khoa Lao động công đoàn", "Khoa Tài chính ngân hàng", "Khoa giáo dục quốc tế"];
if (document.getElementById('notification-page')) {
    let listDepartment = document.querySelector('.notifications-list-department')
    listDepartment.innerHTML = ''
    departments.forEach(function (name, index) {
        let li = document.createElement('li')
        li.className = "notifications-department"
        li.innerHTML = `<a href="#">
                            <img src="/images/department/${imgDepartments[index]}.png" alt="">
                            <div class="department-name">
                               ${name}
                            </div>
                        </a>`
        listDepartment.appendChild(li)
    })
}

if (document.getElementById('account-page')) {
    let departmentCreate = document.querySelector('.modal-create-account .modal-content .department-list')
    departmentCreate.innerHTML = ''
    departments.forEach(function (name, index) {
        let div = document.createElement('div')
        div.className = "department-item"
        div.innerHTML = ` <input type="checkbox" class="checkbox-input" name="department[]" id="${index}" 
                            value="${imgDepartments[index]}">
                            <label class="checkbox-label" for="${index}"></label>
                            <label for="${index}">${name}</label>`
        departmentCreate.appendChild(div)
    })
}


if (document.getElementById('profile-page')) {
    let file = document.querySelector('#file')
    file.addEventListener('change', (e) => {
        let preview = document.getElementById('file-select-preview')
        preview.setAttribute("src", window.URL.createObjectURL(e.target.files[0]))
    })
}

if (document.getElementById('notifications-page')) {
    document.querySelectorAll('.header-menu-item')[1].classList.add('active')
}

if (document.getElementById('home-page')) {
    document.querySelectorAll('.header-menu-item')[0].classList.add('active')
    let inputImgPost = document.querySelector('#post-img')
    inputImgPost.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            document.querySelector('.modal-image-preview').style.display = 'block'
            let url = URL.createObjectURL(e.target.files[0]);
            let imgPreview = document.getElementById('img-post-preview')
            imgPreview.setAttribute("src", url);
            let btnDeleteImg = document.querySelector('.delete-img')
            btnDeleteImg.addEventListener('click', (e) => {
                e.target.files = null
                inputImgPost.setAttribute("value", "")
                document.querySelector('.modal-image-preview').style.display = 'none'
            })
        } else {
            document.querySelector('.modal-image-preview').style.display = 'none'
        }
    })
}

if (document.getElementById('account-page')) {
    document.querySelectorAll('.header-menu-item')[2].classList.add('active')
}