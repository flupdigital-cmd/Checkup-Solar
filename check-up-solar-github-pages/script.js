(function(){
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var dots=document.getElementById('dots'), count=document.getElementById('count');
  var prev=document.getElementById('prev'), next=document.getElementById('next');
  var i=0;
  slides.forEach(function(s,k){
    var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Ir para o slide '+(k+1));
    b.addEventListener('click',function(){go(k)});dots.appendChild(b);
  });
  function go(k){
    i=Math.max(0,Math.min(slides.length-1,k));
    slides.forEach(function(s,n){s.classList.toggle('on',n===i)});
    [].forEach.call(dots.children,function(d,n){d.classList.toggle('on',n===i)});
    count.textContent=(i+1)+' / '+slides.length;
    prev.disabled=i===0; next.disabled=i===slides.length-1;
    slides[i].scrollTop=0;
    try{history.replaceState(null,'','#'+slides[i].dataset.t)}catch(e){}
  }
  prev.addEventListener('click',function(){go(i-1)});
  next.addEventListener('click',function(){go(i+1)});
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();go(i+1)}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(i-1)}
    if(e.key==='Home')go(0); if(e.key==='End')go(slides.length-1);
  });
  var x0=null;
  document.getElementById('stage').addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  document.getElementById('stage').addEventListener('touchend',function(e){
    if(x0===null)return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>60)go(i+(dx<0?1:-1)); x0=null;
  });
  var h=(location.hash||'').slice(1), start=0;
  slides.forEach(function(s,k){if(s.dataset.t===h)start=k});
  go(start);
})();
