document.addEventListener('DOMContentLoaded', function() {
  // Product card click handler
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Make entire card clickable
    card.addEventListener('click', function(e) {
      if (e.target.closest('.btn') || e.target.closest('.quick-view')) {
        return;
      }
      
      const slug = this.dataset.slug;
      if (slug) {
        window.location.href = `/products/${slug}/`;
      }
    });
    
    // Add keyboard support
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const slug = this.dataset.slug;
        if (slug) {
          window.location.href = `/products/${slug}/`;
        }
      }
    });
  });
  
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      // Filter products
      productItems.forEach(item => {
        let show = false;
        
        switch(filter) {
          case 'all':
            show = true;
            break;
          case 'featured':
            show = item.dataset.featured === 'true';
            break;
          case 'travel-planning':
            show = item.dataset.category === 'travel-planning';
            break;
          case 'memory-keeping':
            show = item.dataset.category === 'memory-keeping';
            break;
          case 'under-20':
            show = parseFloat(item.dataset.price) < 20;
            break;
          default:
            show = true;
        }
        
        if (show) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Quick View functionality
  const quickViewButtons = document.querySelectorAll('.quick-view');
  const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
  
  quickViewButtons.forEach(button => {
    button.addEventListener('click', async function(e) {
      e.stopPropagation();
      const slug = this.dataset.slug;
      
      try {
        // Show loading state
        document.getElementById('quickViewContent').innerHTML = `
          <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading product details...</p>
          </div>
        `;
        
        // Fetch product data
        const response = await fetch(`/products/${slug}/index.json`);
        const product = await response.json();
        
        // Populate modal
        document.getElementById('quickViewContent').innerHTML = `
          <div class="row">
            <div class="col-md-6">
              <img src="${product.image}" class="img-fluid rounded" alt="${product.title}">
            </div>
            <div class="col-md-6">
              <h4>${product.title}</h4>
              <p class="text-muted">${product.description}</p>
              
              <div class="mb-3">
                ${product.tags.map(tag => `<span class="badge bg-light text-dark me-1">${tag}</span>`).join('')}
              </div>
              
              <div class="mb-3">
                <h3 class="text-success">${product.price}</h3>
                <small class="text-muted">${product.file_format} • ${product.file_size}</small>
              </div>
              
              <ul class="list-unstyled">
                ${product.includes.map(item => `<li><i class="fas fa-check text-success me-2"></i>${item}</li>`).join('')}
              </ul>
              
              <div class="d-flex gap-2 mt-4">
                <a href="/products/${slug}/" class="btn btn-outline-primary flex-grow-1">
                  <i class="fas fa-info-circle me-1"></i> Full Details
                </a>
                <a href="${product.buy_link}" class="btn btn-success flex-grow-1" target="_blank">
                  <i class="fas fa-shopping-cart me-1"></i> Buy Now
                </a>
              </div>
            </div>
          </div>
        `;
        
        quickViewModal.show();
      } catch (error) {
        document.getElementById('quickViewContent').innerHTML = `
          <div class="alert alert-danger">
            <i class="fas fa-exclamation-circle me-2"></i>
            Failed to load product details. Please try again.
          </div>
        `;
        quickViewModal.show();
      }
    });
  });
  
  // Add product JSON endpoint (for quick view)
  // This should be generated by Hugo - create a layout for it
});

// Create JSON endpoint for products
// Add this to your Hugo config or create a new layout
// for reay to go products
function changeProductImage(src) {
  document.getElementById("mainProductImage").src = src;
}

// for custom itinary
// Change main image on thumbnail click
function changeMainImage(src) {
  const mainImg = document.getElementById("mainImage");
  if (mainImg) {
    mainImg.src = src;
  }
}
