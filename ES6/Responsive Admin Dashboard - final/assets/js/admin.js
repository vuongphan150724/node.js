const apiUrl = 'http://127.0.0.1:3000/products/api/products';
const rowsp = document.querySelector("tbody");
const addForm = document.querySelector("#taskForm");
const addNameInput = document.querySelector("#taskAssignee");
const addPriceInput = document.querySelector("#taskName");
const addImageInput = document.querySelector("#taskImage"); // Thêm dòng này để lấy giá trị của trường "Hình ảnh sản phẩm"
const addViewedInput = document.querySelector("#taskViewed"); // Thêm dòng này để lấy giá trị của trường "Lượt xem"
const editForm = document.querySelector("#editForm");
const editNameInput = document.querySelector("#editTaskAssignee");
const editPriceInput = document.querySelector("#editTaskName");
const editImageInput = document.querySelector("#editTaskImage"); // Thêm dòng này để lấy giá trị của trường "Hình ảnh sản phẩm"
const editViewedInput = document.querySelector("#editTaskViewed");


async function displayProducts() {
    try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        const products = responseData.data;

        rowsp.innerHTML = products.map((product) => {
            const { name, new_price, image, viewed } = product;
            return `
                    <tr class="col-md-3 col-sm-4" data-id='${product._id}'>
                        <td>${name}</td>
                        <td>${new_price ? new_price : ''}</td>
                        <td>${viewed}</td>
                        <td>  <img src="${image}" alt="new-arrivals images"></td>
                        <td ><span class="status delivered">Delivered</span></td>
                        <td>
                            <a class="btn-edit btn btn-primary btn-sm">Sửa</a>
                            <a class="btn-del btn btn-danger btn-sm">Xóa</a>
                        </td>
                    </tr>
                `;
        }).join('');

        attachEditEventListeners();
        attachDeleteEventListeners();
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
}

// Sửa phần attachEditEventListeners để lấy dữ liệu từ API và hiển thị lên form sửa
function attachEditEventListeners() {
    document.querySelectorAll('.btn-edit').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.closest('tr').getAttribute('data-id');
            fetch(`${apiUrl}/${productId}`)
                .then((response) => response.json())
                .then((product) => {
                    editForm.setAttribute('data-id', product.data._id); // Sửa từ data.id thành data._id
                    editNameInput.value = product.data.name;
                    editPriceInput.value = product.data.new_price ? product.data.new_price : '';
                    editViewedInput.value = product.data.viewed ? product.data.viewed : ''; // Lấy giá trị của trường "Lượt xem"

                    // Hiển thị đường dẫn hình ảnh, không gán giá trị cho trường input editImageInput
                    document.querySelector("#imagePreview").src = product.data.image;
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy thông tin sản phẩm:', error);
                });
        });
    });
}

function attachDeleteEventListeners() {
    document.querySelectorAll('.btn-del').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.closest('tr').getAttribute('data-id');
            fetch(`${apiUrl}/${productId}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    displayProducts();
                })
                .catch((error) => {
                    console.error('Lỗi khi xóa sản phẩm:', error);
                });
        });
    });
}

addForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const newProduct = {
        name: addNameInput.value,
        new_price: addPriceInput.value,
        image: addImageInput.value, // Lấy giá trị của trường "Hình ảnh sản phẩm"
        viewed: addViewedInput.value // Lấy giá trị của trường "Lượt xem"
    };

    try {
        // Gửi yêu cầu POST để thêm sản phẩm mới
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            // Nếu yêu cầu thành công, cập nhật lại danh sách sản phẩm
            displayProducts();
            // Đặt lại các trường nhập liệu
            addForm.reset();
        } else {
            console.error('Lỗi khi thêm sản phẩm:', response.statusText);
        }
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
    }
});
editForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const productId = editForm.getAttribute('data-id');
    const updatedProduct = {
        name: editNameInput.value,
        new_price: editPriceInput.value,
        image: editImageInput.value,
        viewed: editViewedInput.value
    };

    try {
        const response = await fetch(`${apiUrl}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            displayProducts();
            editForm.reset();
        } else {
            console.error('Lỗi khi cập nhật sản phẩm:', response.statusText);
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

function toggleForm(formType) {
    if (formType === 'add') {
        document.getElementById('taskForm').style.display = 'block';
        document.getElementById('editForm').style.display = 'none';
    } else if (formType === 'edit') {
        document.getElementById('taskForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';
    }
}