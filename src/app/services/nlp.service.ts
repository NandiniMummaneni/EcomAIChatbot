import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NLPService {
  
  // Advanced NLP processing
  processMessage(message: string): any {
    const tokens = this.tokenize(message);
    const lemmatized = this.lemmatize(tokens);
    const entities = this.namedEntityRecognition(message);
    const intent = this.intentClassification(message, lemmatized);
    const sentiment = this.sentimentAnalysis(message);
    const context = this.contextAnalysis(message);
    
    return {
      tokens,
      lemmatized,
      entities,
      intent,
      sentiment,
      context,
      confidence: this.calculateConfidence(intent, entities, sentiment)
    };
  }

  // Tokenization with advanced preprocessing
  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0 && !this.isStopWord(token));
  }

  // Basic lemmatization
  private lemmatize(tokens: string[]): string[] {
    const lemmaMap: { [key: string]: string } = {
      'running': 'run', 'ran': 'run', 'runs': 'run',
      'buying': 'buy', 'bought': 'buy', 'buys': 'buy',
      'looking': 'look', 'looked': 'look', 'looks': 'look',
      'phones': 'phone', 'headphones': 'headphone',
      'watches': 'watch', 'gaming': 'game'
    };
    
    return tokens.map(token => lemmaMap[token] || token);
  }

  // Named Entity Recognition
  private namedEntityRecognition(text: string): any {
    const entities = {
      products: [],
      brands: [],
      prices: [],
      features: []
    };

    // Product entities
    const productPatterns = {
      'headphone': /\b(headphone|earphone|earbud|audio|music|sound)\w*\b/gi,
      'phone': /\b(phone|smartphone|mobile|iphone|android)\w*\b/gi,
      'watch': /\b(watch|smartwatch|fitness|tracker|wearable)\w*\b/gi,
      'mouse': /\b(mouse|gaming|wireless|optical)\w*\b/gi,
      'speaker': /\b(speaker|bluetooth|portable|sound)\w*\b/gi
    };

    Object.entries(productPatterns).forEach(([product, pattern]) => {
      if (pattern.test(text)) {
        entities.products.push(product);
      }
    });

    // Price entities
    const pricePattern = /₹\s*(\d+(?:,\d+)*)/g;
    let priceMatch;
    while ((priceMatch = pricePattern.exec(text)) !== null) {
      entities.prices.push(parseInt(priceMatch[1].replace(/,/g, '')));
    }

    // Feature entities
    const featurePatterns = [
      'wireless', 'bluetooth', 'noise cancellation', 'battery life',
      'waterproof', 'fast charging', 'high quality', 'premium'
    ];
    
    featurePatterns.forEach(feature => {
      if (text.toLowerCase().includes(feature)) {
        entities.features.push(feature);
      }
    });

    return entities;
  }

  // Advanced Intent Classification
  private intentClassification(message: string, tokens: string[]): any {
    const intents = {
      greeting: { score: 0, patterns: ['hi', 'hello', 'hey', 'good', 'morning', 'evening'] },
      product_inquiry: { score: 0, patterns: ['show', 'find', 'look', 'search', 'need', 'want'] },
      price_inquiry: { score: 0, patterns: ['price', 'cost', 'expensive', 'cheap', 'budget', 'afford'] },
      comparison: { score: 0, patterns: ['compare', 'difference', 'better', 'best', 'vs', 'versus'] },
      purchase: { score: 0, patterns: ['buy', 'purchase', 'order', 'cart', 'checkout'] },
      support: { score: 0, patterns: ['help', 'support', 'problem', 'issue', 'question'] },
      shipping: { score: 0, patterns: ['ship', 'delivery', 'when', 'how long', 'fast'] },
      recommendation: { score: 0, patterns: ['recommend', 'suggest', 'advice', 'opinion'] }
    };

    // Calculate intent scores
    Object.keys(intents).forEach(intent => {
      intents[intent].score = this.calculateIntentScore(tokens, intents[intent].patterns);
    });

    // Find highest scoring intent
    const topIntent = Object.entries(intents)
      .sort(([,a], [,b]) => b.score - a.score)[0];

    return {
      primary: topIntent[0],
      confidence: topIntent[1].score,
      all: intents
    };
  }

  // Advanced Sentiment Analysis
  private sentimentAnalysis(text: string): any {
    const sentimentLexicon = {
      positive: {
        words: ['love', 'like', 'great', 'awesome', 'amazing', 'perfect', 'excellent', 'wonderful', 'fantastic', 'good', 'nice', 'happy', 'satisfied', 'pleased'],
        intensifiers: ['very', 'really', 'extremely', 'absolutely', 'totally']
      },
      negative: {
        words: ['hate', 'dislike', 'bad', 'terrible', 'awful', 'worst', 'disappointed', 'frustrated', 'angry', 'sad', 'horrible', 'poor', 'unsatisfied'],
        intensifiers: ['very', 'really', 'extremely', 'absolutely', 'totally']
      }
    };

    let positiveScore = 0;
    let negativeScore = 0;
    const words = text.toLowerCase().split(/\s+/);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const prevWord = i > 0 ? words[i-1] : '';
      const intensifier = sentimentLexicon.positive.intensifiers.includes(prevWord) ? 2 : 1;

      if (sentimentLexicon.positive.words.includes(word)) {
        positiveScore += intensifier;
      }
      if (sentimentLexicon.negative.words.includes(word)) {
        negativeScore += intensifier;
      }
    }

    const totalScore = positiveScore - negativeScore;
    let sentiment = 'neutral';
    let confidence = 0.5;

    if (totalScore > 0) {
      sentiment = 'positive';
      confidence = Math.min(0.9, 0.5 + (totalScore * 0.1));
    } else if (totalScore < 0) {
      sentiment = 'negative';
      confidence = Math.min(0.9, 0.5 + (Math.abs(totalScore) * 0.1));
    }

    return { sentiment, confidence, scores: { positive: positiveScore, negative: negativeScore } };
  }

  // Context Analysis
  private contextAnalysis(message: string): any {
    const context = {
      questionType: this.identifyQuestionType(message),
      urgency: this.detectUrgency(message),
      complexity: this.assessComplexity(message),
      topics: this.extractTopics(message)
    };

    return context;
  }

  private identifyQuestionType(message: string): string {
    if (/\bwhat\b/i.test(message)) return 'what';
    if (/\bhow\b/i.test(message)) return 'how';
    if (/\bwhen\b/i.test(message)) return 'when';
    if (/\bwhere\b/i.test(message)) return 'where';
    if (/\bwhy\b/i.test(message)) return 'why';
    if (/\bwhich\b/i.test(message)) return 'which';
    if (/\bcan\b/i.test(message)) return 'can';
    return 'none';
  }

  private detectUrgency(message: string): string {
    const urgentWords = ['urgent', 'asap', 'immediately', 'now', 'quick', 'fast', 'emergency'];
    const hasUrgentWords = urgentWords.some(word => message.toLowerCase().includes(word));
    
    if (hasUrgentWords || message.includes('!')) return 'high';
    if (message.includes('?')) return 'medium';
    return 'low';
  }

  private assessComplexity(message: string): string {
    const words = message.split(/\s+/).length;
    const sentences = message.split(/[.!?]+/).length;
    
    if (words > 20 || sentences > 2) return 'high';
    if (words > 10 || sentences > 1) return 'medium';
    return 'low';
  }

  private extractTopics(message: string): string[] {
    const topicKeywords = {
      'technology': ['tech', 'digital', 'smart', 'ai', 'bluetooth', 'wireless'],
      'shopping': ['buy', 'purchase', 'cart', 'order', 'price', 'cost'],
      'support': ['help', 'support', 'problem', 'issue', 'question'],
      'products': ['headphone', 'phone', 'watch', 'mouse', 'speaker']
    };

    const topics = [];
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        topics.push(topic);
      }
    });

    return topics;
  }

  private calculateIntentScore(tokens: string[], patterns: string[]): number {
    let score = 0;
    patterns.forEach(pattern => {
      if (tokens.includes(pattern)) {
        score += 1;
      }
    });
    return score / patterns.length;
  }

  private calculateConfidence(intent: any, entities: any, sentiment: any): number {
    const intentConfidence = intent.confidence || 0;
    const entityConfidence = entities.products.length > 0 ? 0.8 : 0.3;
    const sentimentConfidence = sentiment.confidence || 0.5;
    
    return (intentConfidence + entityConfidence + sentimentConfidence) / 3;
  }

  private isStopWord(word: string): boolean {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    return stopWords.includes(word);
  }
}