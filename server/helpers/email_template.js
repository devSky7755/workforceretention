exports.InitialExitConfidentialEmailTemplate = {
    email_type: 'Initial Exit Email - Non-Confidential',
    description:'This is the initial email that is sent to the employee inviting them to complete an on-line exit interview. For Self-Administered systems.',
    from_address: 'enquiries@workforceretention.com.au',
    subject: 'Sorry you\'re leaving [client_name]',
    body: "Hi [employee_firstname],\r\n\r\n[client_name] has appointed us to manage their Exit Interview Program. They have asked us to contact and invite you to complete an on-line exit interview.\r\n\r\nIt's really important for [client_name] to capture the true sentiment of your experience. They genuinely want to translate your feedback into constructive action that will make a difference to employee retention in the future.\r\n\r\nThank you for taking the time to complete your exit interview. It should only take between 5-20 minutes, depending on how much feedback you'd like to contribute.\r\n\r\nPlease follow the instructions below, which detail your Login Username and Password.\r\n\r\nYour User Profile is;\r\n\r\nLogin Username: [employee_username]\r\nLogin Password: [employee_password]\r\n\r\nWorkforce Retention Employer/Employee Login Page;\r\nhttp://www.workforceretention.com.au/client_login.php\r\n\r\nPasswords and other User Profile detals can be changed by selecting Edit Profile from the User Details menu.\r\n\r\nIf you have any problems with the site please do not hesitate to email us: enquiries@workforceretention.com.au\r\n\r\nAll the very best in your new endeavour!\r\n\r\nregards,\r\nWorkforce Retention"
};
exports.InitialExitNonConfidentialEmailTemplate = {
    email_type: 'Initial Exit Email - Confidential',
    description:'This is the initial email that is sent to the employee inviting them to complete an on-line exit interview. Outsources systems only.',
    from_address: 'enquiries@workforceretention.com.au',
    subject: "Sorry you're leaving [client_name]",
    body: "Hi [employee_firstname],\r\n\r\n[client_name] has appointed us to manage their Exit Interview Program. They have asked us to contact and invite you to complete an on-line exit interview.\r\n\r\nIt's really important for [client_name] to capture the true sentiment of your experience. They genuinely want to translate your feedback into constructive action that will make a difference to employee retention in the future.\r\n\r\nAs independent specialists in employee retention we know that confidentiality plays a significant part in whether you can freely talk about your experience. Our process does not allow your personal responses to be disclosed to [client_name]. We'll wait until there is sufficient numbers to ensure anonimity, before functional results are collated and presented to management.\r\n\r\nThank you for taking the time to complete your exit interview. It should only take between 5-20 minutes, depending on how much feedback you'd like to contribute.\r\n\r\nPlease follow the instructions below, which detail your Login Username and Password.\r\n\r\nYour User Profile is;\r\n\r\nLogin Username: [employee_username]\r\nLogin Password: [employee_password]\r\n\r\nWorkforce Retention Employer/Employee Login Page;\r\nhttp://www.workforceretention.com.au/client_login.php\r\n\r\nPasswords and other User Profile detals can be changed by selecting 'Edit Profile' from the User Details menu.\r\n\r\nIf you have any problems with the site please do not hesitate to email us: enquiries@workforceretention.com.au\r\n\r\nAll the very best in your new endeavour!\r\n\r\nregards,\r\nWorkforce Retention"
};
exports.ExitReminderConfidentialEmailTemplate = {
    email_type: 'Exit Reminder Email - Non-Confidential',
    description:'This is the reminder email that is sent to employees registered who have not completed their exit interview. Self-administrated systems',
    from_address: 'enquiries@workforceretention.com.au',
    subject: "Don't forget your on-line exit interview!",
    body: "Hi [employee_firstname],\r\n\r\nJust a reminder to complete your on-line exit interview before you leave the business.\r\n\r\n[client_name] genuinely want to translate your feedback in constructive action that will make a difference to employees in the future.\r\n\r\nThank you for taking the time to complete your exit interview. It should only take between 5-20 minutes, depending on how much feedback you'd like to contribute.\r\n\r\nPlease use the Login Username and Password previously supplied to access the site. If you cannot remember your password, please visit http://www.workforceretention.com.au/reminder.php and we will issue you with a new one.\r\n\r\nThanks in advance and all the best!\r\nWorkforce Retention"
};
exports.ExitReminderNonConfidentialEmailTemplate = {
    email_type: 'Exit Reminder Email - Confidential',
    description:'This is the reminder email that is sent to employees registered who have not completed their exit interview. Outsourced Systems',
    from_address: 'enquiries@workforceretention.com.au',
    subject: "Don't forget your on-line exit interview!",
    body: "Hi [employee_firstname],\r\n\r\nJust a reminder to complete your on-line exit interview before you leave the business.\r\n\r\n[client_name] genuinely want to translate your feedback in constructive action that will make a difference to employees in the future.\r\n\r\nRemember, our process does not allow your personal responses to be disclosed to [client_name]. Once we have collated enough responses to ensure anonymity they will contribute to a comprehensive exit report for management.\r\n\r\nThank you for taking the time to complete your exit interview. It should only take between 5-20 minutes, depending on how much feedback you'd like to contribute.\r\n\r\nPlease use the Login Username and Password previously supplied to access the site. If you cannot remember your password, please visit http://www.workforceretention.com.au/reminder.php and we will issue you with a new one.\r\n\r\nThanks in advance and all the best!\r\nWorkforce Retention"
};

exports.InitialExitManagerReportEmailTemplate = {
    email_type: 'Initial Exit Email - Manager Reports',
    description:'This is the email script that is sent to managers who have been registered to view the online reports.',
    from_address: 'enquiries@workforceretention.com.au',
    subject: "Manager Login Details",
    body: "Hi [employee_firstname],\r\n\r\nYour details have been entered into the Workforce Retention Web Database and you will soon be able to access exit interviews/reports for employees in your client group.\r\n\r\nYour User Profile is;\r\n\r\nLogin Username: [employee_username]\r\nLogin Password: [employee_password]\r\n\r\nWorkforce Retention Employer/Employee Login Page;\r\nhttp://www.workforceretention.com.au/client_login.php\r\n\r\nPasswords and other User Profile details can be changed by selecting 'Edit Profile' from the User Details menu.\r\n\r\nIf you have any problems with the site please do not hesitate to email us: enquiries@workforceretention.com.au\r\n\r\nregards,\r\nWorkforce Retention"
};

exports.UserEmailPasswordTemplate = {};