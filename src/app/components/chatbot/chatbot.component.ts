import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container" [class.open]="isOpen">
      <div class="chatbot-header" (click)="toggleChat()">
        <div class="bot-info">
          <span class="bot-name">REX</span>
          <span class="bot-subtitle">Your AI Stylist</span>
        </div>
        <span class="toggle-icon">{{isOpen ? '−' : '+'}}</span>
      </div>
      
      <div class="chatbot-body" *ngIf="isOpen">
        <div class="messages">
          <div *ngFor="let message of messages" 
               [class]="'message ' + message.type">
            <div class="message-content">{{message.content}}</div>
          </div>
        </div>
        
        <div class="input-area">
          <input [(ngModel)]="currentMessage" 
                 (keyup.enter)="sendMessage()"
                 placeholder="Ask REX anything..."
                 class="message-input">
          <button (click)="sendMessage()" class="send-btn">Send</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 1000;
      transition: all 0.3s ease;
    }
    .chatbot-header {
      padding: 1rem;
      color: white;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 15px 15px 0 0;
    }
    .bot-info {
      display: flex;
      flex-direction: column;
    }
    .bot-name {
      font-weight: bold;
      font-size: 1rem;
    }
    .bot-subtitle {
      font-size: 0.75rem;
      opacity: 0.9;
    }
    .chatbot-body {
      background: white;
      border-radius: 0 0 15px 15px;
      max-height: 400px;
      display: flex;
      flex-direction: column;
    }
    .messages {
      padding: 1rem;
      height: 300px;
      overflow-y: auto;
      flex: 1;
    }
    .message {
      margin: 0.5rem 0;
      padding: 0.5rem 0.75rem;
      border-radius: 15px;
      max-width: 80%;
      display: inline-block;
      word-wrap: break-word;
    }
    .message.user {
      background: #e3f2fd;
      margin-left: auto;
      text-align: right;
      float: right;
      clear: both;
    }
    .message.bot {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      float: left;
      clear: both;
    }
    .input-area {
      display: flex;
      padding: 1rem;
      border-top: 1px solid #eee;
    }
    .message-input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-right: 0.5rem;
    }
    .send-btn {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      .chatbot-container {
        width: 300px;
        right: 10px;
      }
    }
  `]
})
export class ChatbotComponent {
  isOpen = false;
  currentMessage = '';
  messages = [
    { type: 'bot', content: 'Hi! I\'m REX, your AI shopping assistant. How can I help you today?' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.messages.push({ type: 'user', content: this.currentMessage });
      
      const botResponse = this.getBotResponse(this.currentMessage);
      this.messages.push({ type: 'bot', content: botResponse });
      
      this.currentMessage = '';
    }
  }

  private getBotResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Greetings and pleasantries
    if (this.matchesPattern(lowerMessage, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'])) {
      const greetings = [
        'Hello there! I\'m REX, your personal AI stylist. How can I help you find the perfect products today?',
        'Hi! Great to see you! I\'m here to help you discover amazing products. What are you looking for?',
        'Hey! Welcome to EcomAI! I\'m REX, and I\'d love to help you find exactly what you need.'
      ];
      return this.getRandomResponse(greetings);
    }
    
    // How are you / personal questions
    if (this.matchesPattern(lowerMessage, ['how are you', 'how do you do', 'what\'s up', 'how\'s it going'])) {
      const responses = [
        'I\'m doing great, thank you for asking! I\'m excited to help you find some amazing products today. What can I assist you with?',
        'I\'m fantastic! Ready to help you discover the perfect items for your needs. What are you shopping for?',
        'I\'m wonderful, thanks! I love helping customers find exactly what they\'re looking for. How can I help you today?'
      ];
      return this.getRandomResponse(responses);
    }
    
    // Product searches - Audio
    if (this.matchesPattern(lowerMessage, ['headphones', 'earphones', 'audio', 'music', 'sound', 'listen to music', 'need headphones'])) {
      return '🎧 Perfect choice! I recommend our Wireless Bluetooth Headphones for ₹6,639. They feature noise cancellation, 30-hour battery life, and crystal-clear sound quality. They\'re currently in stock and very popular with our customers!';
    }
    
    // Product searches - Fitness/Watch
    if (this.matchesPattern(lowerMessage, ['watch', 'fitness', 'track', 'exercise', 'workout', 'health', 'steps', 'heart rate', 'smartwatch'])) {
      return '⌚ Excellent! Our Smart Fitness Watch (₹16,599) would be perfect for you. It tracks heart rate, GPS, steps, and integrates seamlessly with your smartphone. With a 4.3/5 star rating, it\'s loved by fitness enthusiasts!';
    }
    
    // Product searches - Phone
    if (this.matchesPattern(lowerMessage, ['phone', 'smartphone', 'mobile', 'call', 'camera', 'photos', 'new phone'])) {
      return '📱 Great timing! Our Smartphone Pro Max (₹82,999) is our flagship device with an advanced camera system, 5G connectivity, and premium performance. It has an outstanding 4.8/5 star rating!';
    }
    
    // Product searches - Gaming
    if (this.matchesPattern(lowerMessage, ['gaming', 'game', 'mouse', 'gamer', 'play games', 'gaming setup'])) {
      return '🎮 For gaming, I highly recommend our Wireless Gaming Mouse (₹7,469)! It features high-precision sensors, RGB lighting, customizable buttons, and wireless freedom for competitive gaming.';
    }
    
    // Budget questions
    if (this.matchesPattern(lowerMessage, ['cheap', 'budget', 'affordable', 'low price', 'inexpensive', 'save money', 'don\'t want to spend much'])) {
      return '💰 I understand you\'re looking for great value! Our most budget-friendly option is the Wireless Charger for just ₹2,489. We also have quality products at various price points. What type of product interests you?';
    }
    
    // Premium/expensive
    if (this.matchesPattern(lowerMessage, ['expensive', 'premium', 'best', 'top', 'high-end', 'luxury', 'flagship', 'want the best'])) {
      return '✨ For premium quality, our Smartphone Pro Max (₹82,999) is our flagship product with cutting-edge technology and the highest rating of 4.8/5 stars. It\'s worth every rupee!';
    }
    
    // Shopping help
    if (this.matchesPattern(lowerMessage, ['help', 'assist', 'support', 'what can you do', 'how can you help', 'need help'])) {
      return '🤖 I\'m here to be your personal shopping assistant! I can help you find products, compare features, check prices, answer questions about shipping and returns, and provide personalized recommendations. What would you like to explore?';
    }
    
    // Shipping questions
    if (this.matchesPattern(lowerMessage, ['shipping', 'delivery', 'ship', 'deliver', 'when will', 'how long', 'fast delivery'])) {
      return '🚚 Great question! We offer FREE shipping on orders over ₹5,000. Standard delivery takes 3-5 business days, and we also have express delivery options for faster shipping. Your order will be carefully packaged and tracked!';
    }
    
    // Return policy
    if (this.matchesPattern(lowerMessage, ['return', 'refund', 'exchange', 'policy', 'not satisfied', 'money back'])) {
      return '🔄 We want you to be completely happy with your purchase! We offer a 30-day return policy. Items must be in original condition. If you\'re not 100% satisfied, we\'ll make it right!';
    }
    
    // Thank you
    if (this.matchesPattern(lowerMessage, ['thank you', 'thanks', 'appreciate', 'grateful'])) {
      return 'You\'re very welcome! I\'m so happy I could help. If you need anything else or have more questions, I\'m always here for you. Happy shopping! 😊';
    }
    
    // Goodbye
    if (this.matchesPattern(lowerMessage, ['bye', 'goodbye', 'see you', 'talk later', 'have a good day'])) {
      return 'Goodbye! It was wonderful helping you today. Feel free to come back anytime if you need assistance. Have a fantastic day! 👋';
    }
    
    // Compliments about the bot
    if (this.matchesPattern(lowerMessage, ['you\'re great', 'you\'re helpful', 'good job', 'awesome', 'amazing', 'smart'])) {
      return 'Aww, thank you so much! That really makes my day! I love helping customers find exactly what they need. Is there anything else I can help you with? 😊';
    }
    
    // Questions about the bot
    if (this.matchesPattern(lowerMessage, ['who are you', 'what are you', 'tell me about yourself', 'your name'])) {
      return 'I\'m REX, your AI stylist and shopping assistant! I\'m here to help you discover amazing products, answer your questions, and make your shopping experience delightful. I know all about our products and love helping customers find perfect matches!';
    }
    
    // General product inquiry
    if (this.matchesPattern(lowerMessage, ['what do you have', 'show me products', 'what\'s available', 'browse', 'catalog'])) {
      return '🛍️ We have an amazing selection! Our popular categories include electronics (headphones, smartphones, fitness watches), accessories, and more. What type of product interests you most? I can give you personalized recommendations!';
    }
    
    // Conversational fallbacks with context understanding
    const conversationalResponses = [
      'That\'s interesting! I\'d love to help you find something perfect for your needs. Could you tell me what type of product you\'re looking for?',
      'I understand! Let me help you with that. Are you interested in electronics, accessories, or something specific? I can provide great recommendations!',
      'Absolutely! I\'m here to make your shopping experience amazing. What can I help you discover today?',
      'I hear you! Let me assist you in finding exactly what you need. What type of products are you most interested in?',
      'That makes sense! I\'m here to help you find the perfect products. Would you like to explore our electronics, or do you have something specific in mind?'
    ];
    
    return this.getRandomResponse(conversationalResponses);
  }
  
  private matchesPattern(message: string, patterns: string[]): boolean {
    return patterns.some(pattern => message.includes(pattern));
  }
  
  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}