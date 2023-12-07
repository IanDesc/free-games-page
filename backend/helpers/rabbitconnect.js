const amqp = require('amqplib');

class RabbitConnect {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await amqp.connect('amqp://localhost:5672');
      this.channel = await this.connection.createChannel();

      console.log('Conectado ao RabbitMQ');
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error.message);
      throw error;
    }
  }

  async close() {
    try {
      await this.channel.close();
      await this.connection.close();

      console.log('Desconectado do RabbitMQ');
    } catch (error) {
      console.error('Erro ao desconectar do RabbitMQ:', error.message);
    }
  }

  async publish(exchange, message) {
    try {
      await this.channel.assertExchange(exchange, 'fanout', { durable: false });
      this.channel.publish(exchange, '', Buffer.from(message));

      console.log(`Mensagem publicada no exchange '${exchange}':`, message);
    } catch (error) {
      console.error('Erro ao publicar mensagem no RabbitMQ:', error.message);
    }
  }
}

module.exports = RabbitConnect;
