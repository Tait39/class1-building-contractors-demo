const heroImages=[
  "https://images.trvl-media.com/lodging/29000000/28070000/28062200/28062126/ae6742a2.jpg?impolicy=resizecrop&ra=fit&rw=1800",
  "https://images.trvl-media.com/lodging/29000000/28070000/28062200/28062126/40089f4f.jpg?impolicy=resizecrop&ra=fit&rw=1800",
  "https://images.trvl-media.com/lodging/29000000/28070000/28062200/28062126/1a5f4731.jpg?impolicy=resizecrop&ra=fit&rw=1800"
];
const hero=document.getElementById("heroImage");
const dots=[...document.querySelectorAll(".hero-dot")];
let slide=0;
function showSlide(index){
  slide=(index+heroImages.length)%heroImages.length;
  hero.style.backgroundImage=`url("${heroImages[slide]}")`;
  dots.forEach((dot,i)=>dot.classList.toggle("active",i===slide));
}
dots.forEach((dot,i)=>dot.addEventListener("click",()=>{showSlide(i); resetTimer();}));
showSlide(0);
let timer=setInterval(()=>showSlide(slide+1),5000);
function resetTimer(){clearInterval(timer);timer=setInterval(()=>showSlide(slide+1),5000);}

const menuToggle=document.getElementById("menuToggle");
const mobileMenu=document.getElementById("mobileMenu");
function closeMenu(){mobileMenu.classList.remove("open");mobileMenu.setAttribute("aria-hidden","true");menuToggle.setAttribute("aria-expanded","false");}
menuToggle.addEventListener("click",()=>{
  const open=!mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open",open);
  mobileMenu.setAttribute("aria-hidden",String(!open));
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.textContent=open?"✕":"☰";
});
mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));

const form=document.getElementById("bookingForm");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const data=new FormData(form);
  const message=[
    "Hello The Palace Guest, I'd like to enquire about a stay.",
    `Name: ${data.get("name")}`,
    `Phone/WhatsApp: ${data.get("phone")}`,
    `Arrival: ${data.get("arrival")}`,
    `Departure: ${data.get("departure")}`,
    `Guests: ${data.get("guests")}`,
    `Room: ${data.get("room")}`,
    `Airport transfer: ${data.get("transfer")?"Yes":"No"}`,
    `Message: ${data.get("message")||"—"}`
  ].join("\n");
  const url="https://wa.me/263773149000?text="+encodeURIComponent(message);
  document.getElementById("formStatus").innerHTML='<a href="'+url+'" target="_blank" rel="noreferrer">Continue on WhatsApp →</a>';
});
