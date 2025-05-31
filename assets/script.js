// Danh sách sản phẩm mẫu
const products = [
  {
    title: "Đất nền trung tâm TP HCM",
    location: "Quận 2, TP HCM",
    area: 120,
    price: 8.5,
    type: "thổ cư",
    img: "https://placehold.co/400x250",
    desc: "Vị trí đắc địa, pháp lý rõ ràng, gần trường học và bệnh viện."
  },
  {
    title: "Đất dự án ven sông",
    location: "Bình Dương",
    area: 200,
    price: 6.2,
    type: "dự án",
    img: "https://placehold.co/400x250",
    desc: "Khu dân cư cao cấp, tiện ích nội khu đầy đủ, sổ hồng riêng."
  },
  {
    title: "Đất nông nghiệp giá tốt",
    location: "Củ Chi, TP HCM",
    area: 1000,
    price: 2.1,
    type: "nông nghiệp",
    img: "https://placehold.co/400x250",
    desc: "Đất rộng, thích hợp đầu tư hoặc làm trang trại."
  },
  {
    title: "Đất nền khu đô thị mới",
    location: "Thủ Đức, TP HCM",
    area: 90,
    price: 5.7,
    type: "thổ cư",
    img: "https://placehold.co/400x250",
    desc: "Khu vực phát triển, gần trung tâm thương mại, an ninh tốt."
  }
];

function renderProducts(list) {
  const productList = document.getElementById('productList');
  productList.innerHTML = list.map(p => `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100 shadow" data-aos="fade-up">
        <img src="${p.img}" class="card-img-top" alt="${p.title}">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text mb-1"><b>Vị trí:</b> ${p.location}</p>
          <p class="card-text mb-1"><b>Diện tích:</b> ${p.area} m²</p>
          <p class="card-text mb-1"><b>Giá:</b> ${p.price} tỷ</p>
          <p class="card-text mb-2"><b>Loại đất:</b> ${p.type}</p>
          <p class="card-text small">${p.desc}</p>
          <a href="#" class="btn btn-gold mt-2">Xem chi tiết</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Lọc sản phẩm
const filterForm = document.getElementById('filterForm');
filterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(filterForm);
  const location = data.get('location').toLowerCase();
  const type = data.get('type');
  const minArea = Number(data.get('minArea')) || 0;
  const maxPrice = Number(data.get('maxPrice')) || Infinity;
  const filtered = products.filter(p =>
    (!location || p.location.toLowerCase().includes(location)) &&
    (!type || p.type === type) &&
    (p.area >= minArea) &&
    (p.price <= maxPrice)
  );
  renderProducts(filtered);
});

// Render mặc định
renderProducts(products);

// Hiệu ứng contact-sidebar xuất hiện khi lướt xuống
window.addEventListener('scroll', function() {
  const sidebar = document.querySelector('.contact-sidebar');
  if (window.scrollY > 120) {
    sidebar.classList.add('contact-sidebar--show');
  } else {
    sidebar.classList.remove('contact-sidebar--show');
  }
});
