interface BookingConfirmationData {
  bookingId: string;
  customerName: string;
  vehicleName: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropLocation: string;
  totalAmount: number;
  addOns: string[];
}

export function getBookingConfirmationEmail(data: BookingConfirmationData) {
  const {
    bookingId,
    customerName,
    vehicleName,
    vehicleModel,
    startDate,
    endDate,
    pickupLocation,
    dropLocation,
    totalAmount,
    addOns,
  } = data;

  const formattedStartDate = new Date(startDate).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });
  const formattedEndDate = new Date(endDate).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return {
    subject: `Booking Confirmation - ${vehicleName} (${bookingId})`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Dear ${customerName},</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for choosing RydeX! Your booking has been confirmed and payment received successfully.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
              <h2 style="color: #1e293b; margin-top: 0; font-size: 20px;">Booking Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Booking ID:</td>
                  <td style="padding: 8px 0; text-align: right;">${bookingId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Vehicle:</td>
                  <td style="padding: 8px 0; text-align: right;">${vehicleName} ${vehicleModel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Pickup:</td>
                  <td style="padding: 8px 0; text-align: right;">${formattedStartDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Drop-off:</td>
                  <td style="padding: 8px 0; text-align: right;">${formattedEndDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Pickup Location:</td>
                  <td style="padding: 8px 0; text-align: right;">${pickupLocation}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Drop Location:</td>
                  <td style="padding: 8px 0; text-align: right;">${dropLocation}</td>
                </tr>
                <tr style="border-top: 2px solid #e2e8f0;">
                  <td style="padding: 12px 0; color: #1e293b; font-weight: 700; font-size: 18px;">Total Amount:</td>
                  <td style="padding: 12px 0; text-align: right; color: #2563eb; font-weight: 700; font-size: 18px;">₹${totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              </table>
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">
              If you have any questions, feel free to contact us at any time.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/account/bookings" 
                 style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                View Booking Details
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
              This is an automated email from RydeX. Please do not reply to this email.<br>
              For support, contact us through our website or customer service.
            </p>
          </div>
        </body>
      </html>
    `,
  };
}

export function getAdminBookingNotification(data: BookingConfirmationData & { customerEmail: string }) {
  const {
    bookingId,
    customerName,
    customerEmail,
    vehicleName,
    vehicleModel,
    startDate,
    endDate,
    pickupLocation,
    dropLocation,
    totalAmount,
    addOns,
  } = data;

  const formattedStartDate = new Date(startDate).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });
  const formattedEndDate = new Date(endDate).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return {
    subject: `New Booking Received - ${bookingId}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Notification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1e293b; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🚗 New Booking Received</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              A new booking has been confirmed on RydeX.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1e293b; margin-top: 0; font-size: 18px;">Booking Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Booking ID:</td>
                  <td style="padding: 8px 0; text-align: right;">${bookingId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Customer:</td>
                  <td style="padding: 8px 0; text-align: right;">${customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0; text-align: right;">${customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Vehicle:</td>
                  <td style="padding: 8px 0; text-align: right;">${vehicleName} ${vehicleModel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Pickup:</td>
                  <td style="padding: 8px 0; text-align: right;">${formattedStartDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Drop-off:</td>
                  <td style="padding: 8px 0; text-align: right;">${formattedEndDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Pickup Location:</td>
                  <td style="padding: 8px 0; text-align: right;">${pickupLocation}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Drop Location:</td>
                  <td style="padding: 8px 0; text-align: right;">${dropLocation}</td>
                </tr>
                <tr style="border-top: 2px solid #e2e8f0;">
                  <td style="padding: 12px 0; color: #1e293b; font-weight: 700; font-size: 18px;">Total Amount:</td>
                  <td style="padding: 12px 0; text-align: right; color: #2563eb; font-weight: 700; font-size: 18px;">₹${totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/bookings" 
                 style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                View in Admin Dashboard
              </a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}
