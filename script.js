document.addEventListener("DOMContentLoaded",function(){
  const menuToggle=document.getElementById("menuToggle");
  const mobileMenu=document.getElementById("mobileMenu");
  if(menuToggle&&mobileMenu){
    menuToggle.addEventListener("click",function(){
      const open=mobileMenu.classList.toggle("open");
      mobileMenu.setAttribute("aria-hidden",String(!open));
      menuToggle.setAttribute("aria-expanded",String(open));
      menuToggle.textContent=open?"✕":"☰";
    });
    mobileMenu.querySelectorAll("a").forEach(function(link){
      link.addEventListener("click",function(){
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden","true");
        menuToggle.setAttribute("aria-expanded","false");
        menuToggle.textContent="☰";
      });
    });
  }

  const dots=Array.from(document.querySelectorAll(".hero-dot"));
  const slides=Array.from(document.querySelectorAll(".hero-slide"));
  let current=0;
  function setSlide(n){
    current=n;
    slides.forEach(function(slide,i){slide.style.opacity=i===n?"1":"0";});
    dots.forEach(function(dot,i){dot.classList.toggle("active",i===n);});
  }
  dots.forEach(function(dot,i){
    dot.addEventListener("click",function(){setSlide(i);});
  });
  setSlide(0);
  setInterval(function(){setSlide((current+1)%slides.length);},5000);

  const form=document.getElementById("bookingForm");
  if(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      const data=new FormData(form);
      const message=[
        "Hello The Palace Guest, I'd like to enquire about a stay.",
        "Name: "+data.get("name"),
        "Phone/WhatsApp: "+data.get("phone"),
        "Arrival: "+data.get("arrival"),
        "Departure: "+data.get("departure"),
        "Guests: "+data.get("guests"),
        "Room: "+data.get("room"),
        "Airport transfer: "+(data.get("transfer")?"Yes":"No"),
        "Message: "+(data.get("message")||"—")
      ].join("\n");
      const url="https://wa.me/263773149000?text="+encodeURIComponent(message);
      document.getElementById("formStatus").innerHTML='<a href="'+url+'" target="_blank" rel="noreferrer">Continue on WhatsApp →</a>';
    });
  }
});