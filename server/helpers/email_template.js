exports.InitialExitConfidentialEmailTemplate = {
    from_address: 'enquiries@workforceretention.com.au',
    subject: 'Sorry you\'re leaving [client_name]',
    body: "Hi [employee_firstname],\r\n\r\n[client_name] has appointed us to manage their Exit Interview Program. They have asked us to contact and invite you to complete an on-line exit interview.\r\n\r\nIt's really important for [client_name] to capture the true sentiment of your experience. They genuinely want to translate your feedback into constructive action that will make a difference to employee retention in the future.\r\n\r\nThank you for taking the time to complete your exit interview. It should only take between 5-20 minutes, depending on how much feedback you'd like to contribute.\r\n\r\nPlease follow the instructions below, which detail your Login Username and Password.\r\n\r\nYour User Profile is;\r\n\r\nLogin Username: [employee_username]\r\nLogin Password: [employee_password]\r\n\r\nWorkforce Retention Employer/Employee Login Page;\r\nhttp://www.workforceretention.com.au/client_login.php\r\n\r\nPasswords and other User Profile detals can be changed by selecting Edit Profile from the User Details menu.\r\n\r\nIf you have any problems with the site please do not hesitate to email us: enquiries@workforceretention.com.au\r\n\r\nAll the very best in your new endeavour!\r\n\r\nregards,\r\nWorkforce Retention"
};
exports.InitialExitNonConfidentialEmailTemplate = () => {

};
exports.ExitReminderConfidentialEmailTemplate = () => {

};
exports.ExitReminderNonConfidentialEmailTemplate = () => {

};

exports.UserEmailPasswordTemplate = {}