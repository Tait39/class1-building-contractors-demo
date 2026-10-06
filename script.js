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
(function(){
  const details={
    breakfast:{
      title:"Breakfast",
      text:"Florence serves breakfast as part of its international cuisine offering. Published listings describe daily English breakfast service; confirm current menu, hours and pricing directly with The Palace Guest.",
      action:"Ask about breakfast →"
    },
    lunch:{
      title:"Lunch",
      text:"Florence is the on-site restaurant at The Palace Guest and serves international cuisine for lunch. Ask the property about today's menu, availability and dietary requirements.",
      action:"Ask about lunch →"
    },
    dinner:{
      title:"Dinner",
      text:"Enjoy dinner at Florence, the property's on-site international cuisine restaurant. Dinner service is listed alongside breakfast and lunch; confirm the current menu and service times directly with the property.",
      action:"Ask about dinner →"
    },
    bar:{
      title:"Bar & lounge",
      text:"The Palace Guest has a bar/lounge alongside Florence, giving guests a relaxed place to unwind on the property. Ask about current opening hours and available drinks when making your enquiry.",
      action:"Ask about the bar →"
    }
  };
  document.addEventListener("DOMContentLoaded",function(){
    const panel=document.getElementById("diningPanel");
    if(!panel)return;
    const title=document.getElementById("diningTitle"), text=document.getElementById("diningText"), action=document.getElementById("diningAction");
    document.querySelectorAll(".dining-item").forEach(function(btn){
      btn.addEventListener("click",function(){
        const d=details[btn.dataset.dining]; if(!d)return;
        document.querySelectorAll(".dining-item").forEach(function(x){x.classList.remove("active")});
        btn.classList.add("active");
        title.textContent=d.title; text.textContent=d.text; action.textContent=d.action;
        panel.scrollIntoView({behavior:"smooth",block:"nearest"});
      });
    });
  });
})();
