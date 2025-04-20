import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  @RabbitSubscribe({
    exchange: 'order.exchange',
    routingKey: 'order.confirmation',
    queue: 'order.confirmation',
  })
  async handleOrderConfirmation(data: {
    orderId: string;
    customerEmail: string;
    items: Array<{ menuId: string; quantity: number }>;
    totalAmount: number;
  }) {
    console.log('Sending order confirmation email:', data.orderId);

    const mailOptions = {
      from: process.env.SMTP_FROM || 'restaurant@example.com',
      to: data.customerEmail,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order! Your order ID is: ${data.orderId}</p>
        <h2>Order Details:</h2>
        <p>Total Amount: $${data.totalAmount}</p>
        <h3>Items:</h3>
        <ul>
          ${data.items.map(item => `<li>Item ID: ${item.menuId} - Quantity: ${item.quantity}</li>`).join('')}
        </ul>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent:', data.orderId);
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
    }
  }
} 