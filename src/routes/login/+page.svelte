

<script>
	import { enhance } from "$app/forms";

    let username = '';
    let password = '';
  </script>

<div class="login-container">
    <div class="login-image"></div>
    <div class="login-form">
      <h2>Login</h2>
      <form action="?/login" method="POST" use:enhance>
        <input type="text" placeholder="Табельный номер" name='username' />
        <input type="password" placeholder="Пароль" name='password' required/>
        <button type="submit">Login</button>
      </form>
    </div>
</div>

  
<style>
    .login-container {
      display: flex;
      height: 100vh;
    }
  
    .login-image {
      flex: 1;
      background-image: url('robot.jfif');
      background-size: cover;
      background-position: center;
    }
  
    .login-form {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
  
    .login-form h2 {
      margin-bottom: 1.5rem;
    }
  
    .login-form input {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .login-form button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>