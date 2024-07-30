// asmfull.js

const apiUrl = 'http://127.0.0.1:3000/products/api/products';
const rowsp = document.querySelector(".new-arrivals-content .row");
const cartItemsContainer = document.getElementById('cartItemsContainer');
let products = []; // Lưu trữ danh sách sản phẩm

document.addEventListener('DOMContentLoaded', async() => {
    await displayProducts();
});

async function displayProducts() {
    try {
        const sortBy = '-viewed'; // Sắp xếp theo viewed từ lớn đến bé
        await searchAndSortProducts('', sortBy);
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
    }
}


async function displayProductDetail(id) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/products/api/products/${id}`);
        if (!response.ok) {
            throw new Error('Lỗi khi lấy chi tiết sản phẩm');
        }

        const product = await response.json();
        console.log(product);

        const productDetailOverlay = document.getElementById('productDetailOverlay');
        productDetailOverlay.innerHTML = `
            <div class="product-detail">
                <img src="${product.data.image}" alt="${product.data.name}">
                <h2>${product.data.name}</h2>
                <p>Giá: ${product.data.new_price} VNĐ</p>
                <button onclick="closeProductDetail()">Đóng</button>
            </div>
        `;
        productDetailOverlay.style.display = 'block';
    } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', error);
    }
}

function closeProductDetail() {
    const productDetailOverlay = document.getElementById('productDetailOverlay');
    productDetailOverlay.innerHTML = ''; // Clear content inside overlay element
    productDetailOverlay.style.display = 'none'; // Hide overlay element
}

async function searchProducts(keyword) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/products/api/products?keyword=${keyword}`);
        if (!response.ok) {
            throw new Error('Lỗi khi tìm kiếm sản phẩm');
        }

        const searchResults = await response.json();
        console.log('Kết quả tìm kiếm:', searchResults);

        // Display search results
        rowsp.innerHTML = searchResults.data
            .map((product, index) => {
                    const { name, new_price, image, status } = product;
                    return `
                    <div class="col-md-3 col-sm-4">
                        <div class="single-new-arrival">
                            <div class="single-new-arrival-bg" onclick="displayProductDetail('${product._id}')">
                                <img src="${image}" alt="new-arrivals images">
                                <div class="single-new-arrival-bg-overlay"></div>
                                ${status ? `<div class="sale bg-1"><p>${status}</p></div>` : ''}
                                <!-- Nút xem chi tiết sản phẩm -->
                                <div class="view-detail-btn">
                                    <a href="#">Xem chi tiết</a>
                                </div>
                            </div>
                            <h4><a href="#">${name}</a></h4>
                            ${new_price ? `<p class="arrival-product-price">${new_price} VNĐ</p>` : ''}
                        </div>
                    </div>
                `;
            })
            .join('');
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    }
}

function search() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim();
    if (keyword !== '') {
        searchProducts(keyword);
    }
}
async function searchAndSortProducts(keyword, sortBy) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/products/api/products?keyword=${keyword}&sortBy=${sortBy}`);
        if (!response.ok) {
            throw new Error('Lỗi khi tìm kiếm và sắp xếp sản phẩm');
        }

        const searchResults = await response.json();
        console.log('Kết quả tìm kiếm và sắp xếp:', searchResults);

        // Sort the search results by viewed in descending order
        const sortedResults = searchResults.data.sort((a, b) => b.viewed - a.viewed);

        // Display search results
        rowsp.innerHTML = sortedResults
            .map((product, index) => {
                const { name, new_price, image, status, viewed } = product;
                return `
                    <div class="col-md-3 col-sm-4">
                        <div class="single-new-arrival">
                            <div class="single-new-arrival-bg" onclick="displayProductDetail('${product._id}')">
                                <img src="${image}" alt="new-arrivals images">
                                <div class="single-new-arrival-bg-overlay"></div>
                                ${status ? `<div class="sale bg-1"><p>${status}</p></div>` : ''}
                                <!-- Nút xem chi tiết sản phẩm -->
                                <div class="view-detail-btn">
                                    <a href="#">Xem chi tiết/ ${viewed}</a>
                                </div>
                            </div>
                            <h4><a href="#">${name}</a></h4>
                            ${new_price ? `<p class="arrival-product-price">${new_price} VNĐ</p>` : ''}
                        </div>
                    </div>
                `;
            })
            .join('');
    } catch (error) {
        console.error('Lỗi khi tìm kiếm và sắp xếp sản phẩm:', error);
    }
}

function searchAndSort() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim();
    const sortBy = '-viewed'; // Sắp xếp theo viewed từ lớn đến bé
    if (keyword !== '') {
        searchAndSortProducts(keyword, sortBy);
    }
}