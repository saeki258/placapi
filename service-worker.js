'use strict';

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'MyDeal';
  var body = 'Free Shipping Friday - TVs & Projectors';
  var icon = 'https://www.videopro.com.au/images/product/micro/8491_1.jpg';
  var tag = 'Push Tag';
  var mail;

  if (event.data) {
    console.log(event.data.json());
    title = event.data.json().title;
    body = event.data.json().body;
    icon = event.data.json().icon;
    tag = event.data.json().tag;
    mail = 'test@test.com';
  }

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      mail: mail
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('おん notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();
  clients.openWindow('https://pub.s7.exacttarget.com/r3hy11okdyx?title=' + event.notification.title + '&tag=' + event.notification.tag + '&mail=' + event.notification.mail)

  // This looks to see if the current is already open and
  // focuses if it is
  // event.waitUntil(clients.matchAll({
  //   type: 'window'
  // }).then(function(clientList) {
  //   for (var i = 0; i < clientList.length; i++) {
  //     var client = clientList[i];
  //     if (client.url === '/' && 'focus' in client) {
  //       return client.focus();
  //     }
  //   }
  //   if (clients.openWindow) {
  //     return clients.openWindow('/');
  //   }
  // }));
});
