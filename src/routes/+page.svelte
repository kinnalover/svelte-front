<script>
    let images = [
      "C:/Users/00057486/Documents/tutorials/svelte-auth/sveltekit-protected-routes/src/routes/2people.png",
      "2people2.png",
      "2people3.png"
    ];
    let currentIndex = 0;
  
    function animateHeroImage() {
      currentIndex = (currentIndex + 1) % images.length;
    }
  
    setInterval(animateHeroImage, 5000);
  </script>
  
  <style>
    /* Reset some styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    body {
      font-family: Arial, sans-serif;
      color: #333;
    }
  
    /* Header styles */
    header {
      background-color: #1c1c1c;
      padding: 20px;
      color: #fff;
    }
  
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    /* Main content styles */
    .hero {
      background-image: url("C:\Users\00057486\Documents\tutorials\svelte-auth\sveltekit-protected-routes\src\routes\s.png");
      background-size: cover;
      background-position: center;
      height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #fff;
      padding: 0 20px;
    }
  
    .hero h1 {
      font-size: 48px;
      margin-bottom: 20px;
    }
  
    .hero p {
      font-size: 24px;
      margin-bottom: 40px;
    }
  
    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  
    .cta-buttons button {
      padding: 12px 24px;
      font-size: 16px;
      background-color: #0077b6;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    /* Footer styles */
    footer {
      background-color: #1c1c1c;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
  </style>
  
  <header>
    <div class="header-content">
      <a href="#">
        <img src="src\routes\logo.png" alt="UiPath Logo"  width="50" height="50">
      </a>
      <nav>
        <a href="#">Platform</a>
        <a href="#">Products</a>
        <a href="#">Solutions</a>
        <a href="#">Resources</a>
        <a href="#">About</a>
      </nav>
    </div>
  </header>
  
  <main>
    <section class="hero">
      <h1>Artificial intelligence for the real-world enterprise.</h1>
      <p>RPA is AI at work.</p>
      <div class="cta-buttons">
        <button>Watch now</button>
        <button>Try RPA free</button>
      </div>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 Halyk Bank. All rights reserved.</p>
  </footer>