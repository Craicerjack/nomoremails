function getMessage(userId, messageId) {
  console.log("messageId", messageId);
  console.log("userId", userId);
  var request = gapi.client.gmail.users.messages.get({
    'userId': userId,
    'id': messageId
  });
  var email = request.execute(function(message) {
    return {
      "Labels": message.result.labelIds.join(),
      "Snippet": message.result.snippet
    }
  });
  return email;
}


function getEmails(userId) {
  gapi.client.gmail.users.messages.list({
    'userId': userId
  }).then(function(response) {
    console.log("response", response);
    var emails = [];
    var messages = response.result.messages;
    if (messages && messages.length > 0) {
      for (i = 0; i < messages.length; i++) {
        var message = messages[i];
        console.log("message", message);
        var email = getMessage(userId, message.id);
        console.log("email", email);
        emails.push(email);
      }
      return emails;
    } else {
      return('No messages found.');
    }
  },
  function(err) { 
    console.error("Execute error", err); 
  });
}