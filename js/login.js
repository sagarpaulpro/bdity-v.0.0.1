  // Background orbs
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Orb {
    constructor(x, y, radius, speedX, speedY, color) {
      this.x = x; this.y = y;
      this.radius = radius;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
    }
    draw() {
      let grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.1, this.x, this.y, this.radius);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.x - this.radius > w) this.x = -this.radius;
      else if(this.x + this.radius < 0) this.x = w + this.radius;
      if(this.y - this.radius > h) this.y = -this.radius;
      else if(this.y + this.radius < 0) this.y = h + this.radius;
    }
  }

  const orbs = [];
  const colors = ['#bb86fc', '#7f39fb', '#3700b3', '#6200ee', '#3700b3aa'];
  for(let i=0; i<35; i++){
    const radius = 20 + Math.random() * 30;
    const x = Math.random() * w;
    const y = Math.random() * h;
    const speedX = (Math.random() - 0.5) * 0.2;
    const speedY = (Math.random() - 0.5) * 0.2;
    const color = colors[Math.floor(Math.random()*colors.length)];
    orbs.push(new Orb(x,y,radius,speedX,speedY,color));
  }

  function animate() {
    ctx.clearRect(0,0,w,h);
    orbs.forEach(o => { o.update(); o.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Tab switching
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginSection = document.getElementById('loginSection');
  const registerSection = document.getElementById('registerSection');

  const showRegisterLink = document.getElementById('showRegister');
  const showLoginLink = document.getElementById('showLogin');

  function showLogin() {
    loginSection.classList.remove('hidden');
    loginSection.setAttribute('aria-hidden', 'false');
    registerSection.classList.add('hidden');
    registerSection.setAttribute('aria-hidden', 'true');
    loginTab.classList.add('active');
    loginTab.setAttribute('aria-selected', 'true');
    registerTab.classList.remove('active');
    registerTab.setAttribute('aria-selected', 'false');
  }

  function showRegister() {
    registerSection.classList.remove('hidden');
    registerSection.setAttribute('aria-hidden', 'false');
    loginSection.classList.add('hidden');
    loginSection.setAttribute('aria-hidden', 'true');
    registerTab.classList.add('active');
    registerTab.setAttribute('aria-selected', 'true');
    loginTab.classList.remove('active');
    loginTab.setAttribute('aria-selected', 'false');
  }

  loginTab.addEventListener('click', showLogin);
  registerTab.addEventListener('click', showRegister);
  showRegisterLink.addEventListener('click', e => { e.preventDefault(); showRegister(); });
  showLoginLink.addEventListener('click', e => { e.preventDefault(); showLogin(); });

  // NID demo data
  const nidInput = document.getElementById('nidInput');
  const nidInfo = document.getElementById('nidInfo');
  const mobileInput = document.getElementById('mobileInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const submitBtn = registerSection.querySelector('button[type="submit"]');

  const demoNidData = {
    '1234567890123': {
      name: 'Md. Sagar Paul',
      dob: '1998-05-15',
      father: 'Bishwanath Pal',
      mother: 'Pushpa Rani Pal',
      address: 'Tarali, Kaliganj, Satkhira',
      gender: 'Male',
    },
  };

  function showNidInfo(data) {
    nidInfo.style.display = 'block';
    nidInfo.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Date of Birth:</strong> ${data.dob}</p>
      <p><strong>Father's Name:</strong> ${data.father}</p>
      <p><strong>Mother's Name:</strong> ${data.mother}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <p><strong>Gender:</strong> ${data.gender}</p>
    `;
  }

  function clearNidInfo() {
    nidInfo.style.display = 'none';
    nidInfo.innerHTML = '';
  }

  function toggleInputs(enable) {
    mobileInput.disabled = !enable;
    emailInput.disabled = !enable;
    passwordInput.disabled = !enable;
    submitBtn.disabled = !enable;
  }

  nidInput.addEventListener('input', () => {
    const val = nidInput.value.trim();
    if(val.length === 13 && /^\d{13}$/.test(val)) {
      if(demoNidData[val]) {
        showNidInfo(demoNidData[val]);
      } else {
        showNidInfo({
          name: 'Demo User',
          dob: '1990-01-01',
          father: 'Demo Father',
          mother: 'Demo Mother',
          address: 'Demo Address',
          gender: 'Not Specified',
        });
      }
      toggleInputs(true);
    } else {
      clearNidInfo();
      toggleInputs(false);
    }
    validateRegisterForm();
  });

  // Image upload preview
  const imgUpload = document.getElementById('imgUpload');
  const imagePreview = document.getElementById('imagePreview');

  imgUpload.addEventListener('change', e => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.innerHTML = `<img src="${event.target.result}" alt="Uploaded Picture" />`;
    };
    reader.readAsDataURL(file);
  });

  // Face Reconfiguration demo alert
  const faceReconfigBtn = document.getElementById('faceReconfigBtn');
  faceReconfigBtn.addEventListener('click', () => {
    alert(
      'Face Reconfiguration is a demo feature.\nIn a real app, this would open face editing tools or AI-based adjustments.'
    );
  });

  // Login form submit demo
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    if(loginForm.checkValidity()){
      alert('Login successful! (Demo)');
      loginForm.reset();
    } else {
      alert('Please fill all login fields correctly.');
    }
  });

  // Register form submit demo
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    if(registerForm.checkValidity()){
      alert('Registration successful! (Demo)');
      registerForm.reset();
      clearNidInfo();
      toggleInputs(false);
      imagePreview.innerHTML = '<span style="color:#666;">No image selected</span>';
      submitBtn.disabled = true;
    } else {
      alert('Please fill all register fields correctly.');
    }
  });

  // Enable submit button only if form valid
  function validateRegisterForm() {
    if(registerForm.checkValidity()){
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Validate on input change for mobile, email, password
  [mobileInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', validateRegisterForm);
  });
