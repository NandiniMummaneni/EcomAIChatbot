import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="login-container">
        <div class="login-card">
          <!-- Login Form -->
          <div *ngIf="!showForgotPassword">
            <h1 class="gradient-text">Login</h1>
            <form (ngSubmit)="onLogin()" #loginForm="ngForm">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" [(ngModel)]="email" name="email" 
                       required pattern=".*@gmail\.com$" class="form-control" 
                       placeholder="Enter your Gmail address">
                <div class="helper-text">Email should be &#64;gmail.com</div>
                <div *ngIf="emailError" class="error-message">{{emailError}}</div>
              </div>
              
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" [(ngModel)]="password" name="password" 
                       required minlength="6" class="form-control" placeholder="Enter your password">
                <div class="helper-text">Password can be anyone</div>
                <div *ngIf="passwordError" class="error-message">{{passwordError}}</div>
              </div>
              
              <button type="submit" [disabled]="!isFormValid()" 
                      class="btn btn-primary login-btn">Login</button>
            </form>
            
            <div class="login-footer">
              <p>Don't have an account? <a href="#" class="signup-link">Sign up</a></p>
              <p><a (click)="showForgotPasswordForm()" class="forgot-link">Forgot password?</a></p>
            </div>
          </div>

          <!-- Forgot Password Form -->
          <div *ngIf="showForgotPassword">
            <h1 class="gradient-text">Forgot Password</h1>
            <p class="forgot-description">Choose how you'd like to receive your OTP:</p>
            
            <div class="recovery-options">
              <div class="option-card" [class.selected]="recoveryMethod === 'email'" 
                   (click)="selectRecoveryMethod('email')">
                <div class="option-icon">📧</div>
                <div class="option-text">Email</div>
              </div>
              <div class="option-card" [class.selected]="recoveryMethod === 'mobile'" 
                   (click)="selectRecoveryMethod('mobile')">
                <div class="option-icon">📱</div>
                <div class="option-text">Mobile</div>
              </div>
            </div>

            <form (ngSubmit)="sendOTP()" #forgotForm="ngForm" *ngIf="recoveryMethod">
              <div class="form-group" *ngIf="recoveryMethod === 'email'">
                <label for="recoveryEmail">Email Address</label>
                <input type="email" id="recoveryEmail" [(ngModel)]="recoveryEmail" 
                       name="recoveryEmail" required pattern=".*@gmail\.com$" 
                       class="form-control" placeholder="Enter your Gmail address">
              </div>
              
              <div class="form-group" *ngIf="recoveryMethod === 'mobile'">
                <label for="recoveryMobile">Mobile Number</label>
                <input type="tel" id="recoveryMobile" [(ngModel)]="recoveryMobile" 
                       name="recoveryMobile" required pattern="[0-9]{10}" 
                       class="form-control" placeholder="Enter 10-digit mobile number">
              </div>
              
              <button type="submit" [disabled]="!forgotForm.form.valid" 
                      class="btn btn-primary">Send OTP</button>
            </form>
            
            <div class="login-footer">
              <p><a (click)="backToLogin()" class="back-link">← Back to Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem 0;
    }
    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 450px;
    }
    .login-card h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
    }

    .helper-text {
      color: #999;
      font-size: 0.8rem;
      margin-top: 0.25rem;
      opacity: 0.7;
      font-style: italic;
    }
    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .login-btn {
      width: 100%;
      padding: 0.75rem;
      font-size: 1.1rem;
      margin-top: 1rem;
    }
    .login-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .login-footer {
      text-align: center;
      margin-top: 2rem;
    }
    .login-footer p {
      margin: 0.5rem 0;
    }
    .signup-link, .forgot-link, .back-link {
      color: #667eea;
      text-decoration: none;
      cursor: pointer;
    }
    .signup-link:hover, .forgot-link:hover, .back-link:hover {
      text-decoration: underline;
    }
    .forgot-description {
      text-align: center;
      margin-bottom: 2rem;
      color: #666;
    }
    .recovery-options {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .option-card {
      flex: 1;
      padding: 1.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }
    .option-card:hover {
      border-color: #667eea;
      background: #f8f9ff;
    }
    .option-card.selected {
      border-color: #667eea;
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
    }
    .option-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    .option-text {
      font-weight: 500;
    }
    @media (max-width: 768px) {
      .login-card {
        margin: 1rem;
        padding: 1.5rem;
      }
      .recovery-options {
        flex-direction: column;
      }
      .option-card {
        padding: 1rem;
      }
    }
    @media (max-width: 480px) {
      .login-card {
        padding: 1rem;
      }
      .form-control {
        font-size: 16px; /* Prevents zoom on iOS */
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  emailError = '';
  passwordError = '';
  showForgotPassword = false;
  recoveryMethod: 'email' | 'mobile' | null = null;
  recoveryEmail = '';
  recoveryMobile = '';

  constructor(private router: Router) {}

  isFormValid(): boolean {
    return this.isValidGmail(this.email) && this.password.length >= 6;
  }

  isValidGmail(email: string): boolean {
    return email.endsWith('@gmail.com') && email.length > 10;
  }

  onLogin() {
    this.emailError = '';
    this.passwordError = '';

    if (!this.isValidGmail(this.email)) {
      this.emailError = 'Please enter a valid Gmail address';
      return;
    }

    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
      return;
    }

    // Simulate login success
    alert(`Login successful! Welcome ${this.email}`);
    this.router.navigate(['/']);
  }

  showForgotPasswordForm() {
    this.showForgotPassword = true;
    this.recoveryMethod = null;
  }

  backToLogin() {
    this.showForgotPassword = false;
    this.recoveryMethod = null;
    this.recoveryEmail = '';
    this.recoveryMobile = '';
  }

  selectRecoveryMethod(method: 'email' | 'mobile') {
    this.recoveryMethod = method;
  }

  sendOTP() {
    if (this.recoveryMethod === 'email') {
      if (!this.isValidGmail(this.recoveryEmail)) {
        alert('Please enter a valid Gmail address');
        return;
      }
      alert(`OTP sent to ${this.recoveryEmail}`);
    } else if (this.recoveryMethod === 'mobile') {
      if (!/^[0-9]{10}$/.test(this.recoveryMobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }
      alert(`OTP sent to ${this.recoveryMobile}`);
    }
  }
}