import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Contact Info</h3>
            <p>📧 support&#64;ecomai.com</p>
            <p>📞 1-800-ECOM-AI</p>
            <p>🧭 123 Shopping St, Commerce City</p>
          </div>
          
          <div class="footer-section">
            <h3>Store Locator</h3>
            <div class="store-map">
              <p>📍 Downtown Store - 0.5 miles</p>
              <p>📍 Mall Location - 1.2 miles</p>
              <p>📍 Suburb Branch - 2.8 miles</p>
              <button class="btn btn-outline">View All Stores</button>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Business Hours</h3>
            <p>Monday - Sunday: 9AM - 9PM</p>
            <p>Customer Service: 24/7</p>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 EcomAI. All rights reserved.</p>
          <p>Powered by AI Assistant REX</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: 4rem;
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .footer-section h3 {
      color: #667eea;
      margin-bottom: 1rem;
    }
    .footer-section p {
      margin: 0.5rem 0;
      line-height: 1.6;
    }
    .store-map {
      background: rgba(255,255,255,0.1);
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,0.2);
      color: #bdc3c7;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid #667eea;
      color: #667eea;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 0.5rem;
    }
    .btn-outline:hover {
      background: #667eea;
      color: white;
    }
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}