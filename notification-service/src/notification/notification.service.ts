import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly transporter;

  constructor() {
    // For testing purposes, use Ethereal Email
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass',
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
    items?: Array<{ menuId: string; quantity: number }>;
    totalAmount: number;
  }): Promise<void> {
    this.logger.log(`[Order Confirmation] Sending email for order: ${data.orderId}`);

    const itemsList = data.items && data.items.length > 0
      ? data.items.map(item => `<li>Item ID: ${item.menuId} - Quantity: ${item.quantity}</li>`).join('')
      : '<li>No items specified</li>';

    const mailOptions = {
      from: process.env.SMTP_FROM || 'restaurant@example.com',
      to: data.customerEmail,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order! Your order ID is: ${data.orderId}</p>
        <h2>Order Details:</h2>
        <p>Total Amount: $${data.totalAmount?.toFixed(2) || 'N/A'}</p>
        <h3>Items:</h3>
        <ul>
          ${itemsList}
        </ul>
      `,
    };

    try {
      // Log the email content instead of sending
      this.logger.log(`[Email Content] ${JSON.stringify(mailOptions, null, 2)}`);
      this.logger.log(`[Order Confirmation] Email logged for order: ${data.orderId}`);
    } catch (error) {
      this.logger.error(`Failed to process email: ${error.message}`);
    }
  }

  @RabbitSubscribe({
    exchange: 'order.exchange',
    routingKey: 'order.status',
    queue: 'order.status',
  })
  async handleOrderStatusUpdate(data: {
    orderId: string;
    status: string;
    customerEmail: string;
  }): Promise<void> {
    this.logger.log(`[Order Status Update] Sending email for order: ${data.orderId}`);

    const mailOptions = {
      from: process.env.SMTP_FROM || 'restaurant@example.com',
      to: data.customerEmail,
      subject: 'Order Status Update',
      html: `
        <h1>Order Status Update</h1>
        <p>Your order (ID: ${data.orderId}) status has been updated to: ${data.status || 'Unknown'}</p>
      `,
    };

    try {
      // Log the email content instead of sending
      this.logger.log(`[Email Content] ${JSON.stringify(mailOptions, null, 2)}`);
      this.logger.log(`[Order Status Update] Email logged for order: ${data.orderId}`);
    } catch (error) {
      this.logger.error(`Failed to process email: ${error.message}`);
    }
  }

  async sendEmail(to: string, subject: string, message: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'restaurant@example.com',
        to,
        subject,
        text: message,
      };

      // Log the email content instead of sending
      this.logger.log(`[Test Email Content] ${JSON.stringify(mailOptions, null, 2)}`);
      return {
        success: true,
        message: 'Email content logged',
      };
    } catch (error) {
      this.logger.error(`Failed to process email: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }
} 