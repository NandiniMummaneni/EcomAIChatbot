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
        width: calc(100vw - 20px);
        max-width: 350px;
        right: 10px;
        left: 10px;
        margin: 0 auto;
      }
      .chatbot-body {
        max-height: 300px;
      }
      .messages {
        height: 200px;
      }
    }
    @media (max-width: 480px) {
      .chatbot-container {
        bottom: 10px;
        width: calc(100vw - 20px);
      }
      .message {
        max-width: 90%;
        font-size: 14px;
      }
      .input-area {
        padding: 0.75rem;
      }
      .message-input {
        font-size: 14px;
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
    
    if (!this.isOpen) {
      this.messages = [
        { type: 'bot', content: 'Hi! I\'m REX, your AI shopping assistant. How can I help you today?' }
      ];
    }
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
    const analysis = this.analyzeMessage(message);
    return this.generateIntelligentResponse(message, analysis);
  }

  private analyzeMessage(message: string): any {
    const tokens = this.tokenize(message);
    const sentiment = this.analyzeSentiment(message);
    const intent = this.classifyIntent(message, tokens);
    const entities = this.extractEntities(message);
    const context = this.analyzeContext(message);
    
    return { tokens, sentiment, intent, entities, context, confidence: this.calculateConfidence(intent, entities, sentiment) };
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0 && !this.isStopWord(token));
  }

  private isStopWord(word: string): boolean {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    return stopWords.includes(word);
  }

  private analyzeSentiment(message: string): any {
    const positiveWords = ['love', 'like', 'great', 'awesome', 'amazing', 'perfect', 'excellent', 'wonderful', 'good', 'nice', 'happy'];
    const negativeWords = ['hate', 'dislike', 'bad', 'terrible', 'awful', 'worst', 'disappointed', 'frustrated', 'angry', 'sad'];
    
    const words = message.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveScore++;
      if (negativeWords.includes(word)) negativeScore++;
    });
    
    let sentiment = 'neutral';
    if (positiveScore > negativeScore) sentiment = 'positive';
    else if (negativeScore > positiveScore) sentiment = 'negative';
    
    return { sentiment, confidence: Math.max(positiveScore, negativeScore) / words.length };
  }

  private classifyIntent(message: string, tokens: string[]): any {
    const intents: any = {
      greeting: { patterns: ['hi', 'hello', 'hey', 'good', 'morning', 'evening'], score: 0 },
      product_inquiry: { patterns: ['show', 'find', 'look', 'search', 'need', 'want', 'buy'], score: 0 },
      price_inquiry: { patterns: ['price', 'cost', 'expensive', 'cheap', 'budget', 'afford'], score: 0 },
      comparison: { patterns: ['compare', 'difference', 'better', 'best', 'vs', 'versus'], score: 0 },
      support: { patterns: ['help', 'support', 'problem', 'issue', 'question'], score: 0 },
      shipping: { patterns: ['ship', 'delivery', 'when', 'how long', 'fast'], score: 0 }
    };

    Object.keys(intents).forEach(intent => {
      intents[intent].score = this.calculateIntentScore(tokens, intents[intent].patterns);
    });

    const topIntent = Object.entries(intents).sort(([,a], [,b]) => (b as any).score - (a as any).score)[0];
    return { primary: topIntent[0], confidence: (topIntent[1] as any).score, all: intents };
  }

  private calculateIntentScore(tokens: string[], patterns: string[]): number {
    let score = 0;
    patterns.forEach(pattern => {
      if (tokens.includes(pattern)) score += 1;
    });
    return score / patterns.length;
  }

  private extractEntities(message: string): any {
    const entities: any = { products: [], features: [], prices: [] };
    
    const productPatterns = {
      headphone: /\b(headphone|earphone|audio|music|sound)\w*\b/gi,
      phone: /\b(phone|smartphone|mobile|call|camera)\w*\b/gi,
      watch: /\b(watch|fitness|track|exercise|workout|health)\w*\b/gi,
      gaming: /\b(gaming|game|mouse|gamer|play)\w*\b/gi
    };

    Object.entries(productPatterns).forEach(([product, pattern]) => {
      if (pattern.test(message)) entities.products.push(product);
    });

    const pricePattern = /₹\s*(\d+(?:,\d+)*)/g;
    let priceMatch;
    while ((priceMatch = pricePattern.exec(message)) !== null) {
      entities.prices.push(parseInt(priceMatch[1].replace(/,/g, '')));
    }

    return entities;
  }

  private analyzeContext(message: string): any {
    const words = message.split(/\s+/);
    return {
      messageLength: words.length,
      hasQuestion: message.includes('?') || /\b(what|how|when|where|why|which|who|can|do|are)\b/i.test(message),
      urgency: /\b(urgent|asap|now|quick|fast)\b/i.test(message) ? 'high' : 'normal',
      complexity: words.length > 15 ? 'high' : words.length > 8 ? 'medium' : 'low'
    };
  }

  private calculateConfidence(intent: any, entities: any, sentiment: any): number {
    const intentConf = intent.confidence || 0;
    const entityConf = entities.products.length > 0 ? 0.8 : 0.3;
    const sentimentConf = sentiment.confidence || 0.5;
    return (intentConf + entityConf + sentimentConf) / 3;
  }

  private generateIntelligentResponse(message: string, analysis: any): string {
    const { intent, sentiment, entities, context, confidence } = analysis;
    
    // High confidence responses
    if (confidence > 0.6) {
      return this.getHighConfidenceResponse(intent, entities, sentiment, context);
    }
    
    // Medium confidence responses
    if (confidence > 0.3) {
      return this.getMediumConfidenceResponse(intent, entities, sentiment, context);
    }
    
    // Low confidence - contextual fallback
    return this.getContextualFallback(message, analysis);
  }

  private getHighConfidenceResponse(intent: any, entities: any, sentiment: any, context: any): string {
    switch (intent.primary) {
      case 'greeting':
        return this.getPersonalizedGreeting(sentiment);
      case 'product_inquiry':
        return this.getProductResponse(entities);
      case 'price_inquiry':
        return this.getPriceResponse(entities, context);
      case 'comparison':
        return this.getComparisonResponse();
      case 'support':
        return this.getSupportResponse(context);
      case 'shipping':
        return this.getShippingResponse(context);
      default:
        return this.getGeneralResponse(entities, sentiment);
    }
  }

  private getMediumConfidenceResponse(intent: any, entities: any, sentiment: any, context: any): string {
    const responses = [
      `I think you're asking about ${intent.primary.replace('_', ' ')}. Let me help you with that!`,
      `Based on what I understand, you're interested in ${entities.products.join(', ') || 'our products'}. Here's what I can tell you:`,
      `I'm picking up that you want to know about ${intent.primary.replace('_', ' ')}. How can I assist?`
    ];
    return this.getRandomResponse(responses) + ' ' + this.getBasicProductInfo();
  }

  private getContextualFallback(message: string, analysis: any): string {
    const { context, sentiment } = analysis;
    
    if (context.hasQuestion) {
      return 'That\'s a great question! I\'m here to help with product recommendations, pricing, or any shopping questions. Could you be more specific about what you\'re looking for?';
    }
    
    if (context.messageLength <= 3) {
      return 'I\'m here to help! Could you tell me more about what you\'re looking for? I can assist with products, pricing, or any questions!';
    }
    
    if (sentiment.sentiment === 'positive') {
      return 'I love your enthusiasm! I\'m here to help you find amazing products. What can I show you today?';
    }
    
    if (sentiment.sentiment === 'negative') {
      return 'I understand your concern. Let me help you find something better! What specific features are important to you?';
    }
    
    const contextualResponses = [
      'I understand! As your AI shopping assistant, I\'m here to help you find exactly what you need. What can I assist you with?',
      'That\'s interesting! I can help you discover amazing products. Tell me more about what you\'re looking for!',
      'I\'m here to assist! Whether you need product recommendations or have questions, I\'m ready to help. What interests you?'
    ];
    
    return this.getRandomResponse(contextualResponses);
  }

  private getPersonalizedGreeting(sentiment: any): string {
    if (sentiment.sentiment === 'positive') {
      return 'Hello! I can sense your positive energy! 😊 I\'m REX, and I\'m excited to help you find amazing products today!';
    }
    return 'Hello! I\'m REX, your AI shopping assistant. How can I help you discover the perfect products today?';
  }

  private getProductResponse(entities: any): string {
    if (entities.products.includes('headphone')) {
      return '🎧 Perfect choice! Our Wireless Bluetooth Headphones (₹6,639) feature noise cancellation, 30-hour battery life, and premium sound quality!';
    }
    if (entities.products.includes('phone')) {
      return '📱 Great timing! Our Smartphone Pro Max (₹82,999) has advanced cameras, 5G connectivity, and 4.8⭐ rating!';
    }
    if (entities.products.includes('watch')) {
      return '⌚ Excellent! Our Smart Fitness Watch (₹16,599) tracks health metrics, GPS, and has 4.3⭐ rating!';
    }
    if (entities.products.includes('gaming')) {
      return '🎮 For gaming, try our Wireless Gaming Mouse (₹7,469) with high-precision sensors and RGB lighting!';
    }
    return '🛍️ We have amazing electronics! What specific type of product interests you most?';
  }

  private getPriceResponse(entities: any, context: any): string {
    const urgency = context.urgency === 'high' ? ' We have express options available!' : '';
    return `💰 Our products range from ₹2,489 (Wireless Charger) to ₹82,999 (Smartphone Pro Max).${urgency} What's your budget range?`;
  }

  private getComparisonResponse(): string {
    return '📊 I\'d love to help you compare! Our top performers: Smartphone Pro Max (4.8⭐), Smart Fitness Watch (4.3⭐), and Wireless Headphones (4.5⭐). What aspects matter most?';
  }

  private getSupportResponse(context: any): string {
    if (context.urgency === 'high') {
      return '🚨 I understand this is urgent! I\'m here to help immediately. What specific issue can I resolve for you?';
    }
    return '🤖 I\'m here to provide comprehensive support! I can help with products, pricing, shipping, returns, or any concerns. What do you need?';
  }

  private getShippingResponse(context: any): string {
    if (context.urgency === 'high') {
      return '🚚 For urgent orders, we offer same-day delivery in select areas! Standard shipping is FREE on orders over ₹5,000.';
    }
    return '🚚 We offer FREE shipping on orders over ₹5,000! Standard delivery takes 3-5 business days with tracking.';
  }

  private getGeneralResponse(entities: any, sentiment: any): string {
    return 'I\'m here to help you find exactly what you need! Whether it\'s electronics, pricing info, or product recommendations, just let me know what interests you.';
  }

  private getBasicProductInfo(): string {
    return 'We have headphones, smartphones, fitness watches, gaming accessories, and more!';
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}