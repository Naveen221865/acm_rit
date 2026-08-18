function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // ── SHEET ──────────────────────────────────────────
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.first_name,
      data.last_name,
      data.register_number,
      data.department,
      data.section,
      data.year,
      data.phone,
      data.email,
      data.interest,
      data.reason
    ]);

    // ── MAIL TO YOU ────────────────────────────────────
    var adminMail = "naveen18652007@gmail.com";
    var adminBody =
      "New ACM RIT Membership Application\n\n" +
      "Name            : " + data.first_name + " " + data.last_name + "\n" +
      "Register Number : " + data.register_number + "\n" +
      "Department      : " + data.department + "\n" +
      "Section         : " + data.section + "\n" +
      "Year            : " + data.year + "\n" +
      "Phone           : " + data.phone + "\n" +
      "Email           : " + data.email + "\n" +
      "Interest        : " + data.interest + "\n" +
      "Reason          : " + data.reason + "\n" +
      "Submitted At    : " + new Date();

    MailApp.sendEmail({
      to: adminMail,
      subject: "New ACM RIT Application – " + data.first_name + " " + data.last_name,
      body: adminBody
    });

    // ── WELCOME MAIL TO STUDENT ────────────────────────
    var studentBody =
      "Hi " + data.first_name + ",\n\n" +
      "We're thrilled that you've taken the first step toward joining ACM RIT — the official ACM Student Chapter at Rajalakshmi Institute of Technology!\n\n" +
      "Your application has been received successfully. Our team will review your details and get back to you shortly with the next steps for joining.\n\n" +
      "Here's a summary of what you submitted:\n" +
      "  Name       : " + data.first_name + " " + data.last_name + "\n" +
      "  Reg. No    : " + data.register_number + "\n" +
      "  Department : " + data.department + "\n" +
      "  Year       : " + data.year + "\n\n" +
      "In the meantime, feel free to explore our website and stay tuned for upcoming events and workshops.\n\n" +
      "We look forward to having you as part of our community!\n\n" +
      "Warm regards,\n" +
      "ACM RIT Team\n" +
      "Rajalakshmi Institute of Technology, Chennai\n" +
      "acm@ritchennai.edu.in";

    MailApp.sendEmail({
      to: data.email,
      subject: "Welcome to ACM RIT – Application Received!",
      body: studentBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
