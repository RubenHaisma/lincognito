// Real-time analytics using polling and WebSocket for Prisma-based setup
export class RealtimeAnalytics {
  private callbacks: Map<string, Function[]> = new Map();
  private pollingInterval: NodeJS.Timeout | null = null;
  private lastUpdate: Date | null = null;

  constructor(private userId: string) {}

  subscribe() {
    // Start polling for updates every 30 seconds
    this.pollingInterval = setInterval(() => {
      this.checkForUpdates();
    }, 30000);

    return this;
  }

  private async checkForUpdates() {
    try {
      const response = await fetch(`/api/analytics/realtime?userId=${this.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const currentUpdate = new Date(data.lastUpdated);
        
        if (!this.lastUpdate || currentUpdate > this.lastUpdate) {
          this.lastUpdate = currentUpdate;
          this.emit('analytics_updated', data);
        }
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
    }
  }

  on(event: string, callback: Function) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  unsubscribe() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Manual trigger for immediate updates
  async triggerUpdate() {
    await this.checkForUpdates();
  }
}

// WebSocket-like interface for real-time updates
export class AnalyticsWebSocket {
  private ws: WebSocket | null = null;
  private callbacks: Map<string, Function[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(private userId: string) {}

  connect() {
    if (typeof window === 'undefined') return;

    const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/ws/analytics?userId=${this.userId}`;
    
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('Analytics WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.type, data.payload);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('Analytics WebSocket disconnected');
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('Analytics WebSocket error:', error);
    };
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 1000 * this.reconnectAttempts);
    }
  }

  on(event: string, callback: Function) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}