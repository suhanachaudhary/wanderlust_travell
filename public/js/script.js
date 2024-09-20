// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

    // Function to handle search
    function searchDestination(event) {
        event.preventDefault(); 

        const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // Get the search input and convert to lowercase
        const cards = document.querySelectorAll('.card'); 
        console.log(cards);
        console.log('Search term:', searchTerm);

        cards.forEach(card => {
            const titleElement = card.querySelector('.card-title');
            
            if (titleElement) {
              const title = titleElement.innerText.toLowerCase(); 
              console.log('Card Title:', title);  
                if (title.includes(searchTerm)) {
                  console.log("yes")
                    card.style.display = 'block'; 
                } else {
                  console.log("no")
                    card.style.display = 'none'; 
                }
              }
              else {
                console.log('Card title not found for this card:', card);
            }       
        });
    }



// Function to change the theme
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  
  // Save the user's theme choice in local storage
  localStorage.setItem('theme', theme);
}

// Load the saved theme on page load
window.onload = function() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    setTheme(savedTheme);
  }
};


const initSlider=()=>{
  const imageList=document.querySelector(".slider-wrapper .image-list")

  let slideBtn=document.querySelectorAll(".slider-wrapper .slide-button");

  const maxScrollLeft=imageList.scrollWidth-imageList.clientWidth;

  slideBtn.forEach(button=>{
      button.addEventListener("click",()=>{
          console.log(button);
          const dir=button.id==="prev-slide" ? -1:1;
          const scrollAmt=imageList.clientWidth * dir;
          imageList.scrollBy({left:scrollAmt, behavior:"smooth"});
          console.log("....");
      });
  });

  const handleSlideBtn=()=>{
      slideBtn[0].style.display=imageList.scrollLeft <=0 ?"none":"block";
      slideBtn[1].style.display=imageList.scrollLeft >=maxScrollLeft ?"none":"block";
  }

  imageList.addEventListener("scroll",()=>{
      handleSlideBtn();
  })
}

window.addEventListener("load",initSlider);

//westernwear slider
new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,
  // Pagination bullets
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
  },
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  // Responsive breakpoints
  breakpoints: {
      0: {
          slidesPerView: 1
      },
      768: {
          slidesPerView: 2
      },
      1024: {
          slidesPerView: 3
      }
  }
});


  